import { BadRequestException, Injectable } from '@nestjs/common';
import { Address, createPublicClient, formatEther, http, parseAbi } from 'viem';
import { base } from 'viem/chains';
import { InjectRepository } from '@nestjs/typeorm';
import { BlockReward, RoundReward } from '../entities';
import { Repository } from 'typeorm';
import { TigService } from './tig.service';

@Injectable()
export class NodesService {
  private _publicClient = createPublicClient({
    chain: base,
    transport: http(),
  });

  constructor(
    @InjectRepository(RoundReward)
    private roundRewardsRepository: Repository<RoundReward>,
    @InjectRepository(BlockReward)
    private blockRewardsRepository: Repository<BlockReward>,
  ) {}

  async getWalletBalances(addresses: string[]) {
    try {
      return await Promise.all(
        addresses.map(async (address) => ({
          balance: Number(
            formatEther(
              await this._publicClient.readContract({
                address: '0x0c03ce270b4826ec62e7dd007f0b716068639f7b',
                abi: parseAbi([
                  'function balanceOf(address) public view returns (uint256)',
                ]),
                functionName: 'balanceOf',
                args: [address as Address],
              }),
            ),
          ),
          address,
        })),
      );
    } catch (e) {
      throw new BadRequestException(e.shortMessage);
    }
  }

  async getRoundRewards(addresses: string[]) {
    const { round } = await this.roundRewardsRepository.findOne({
      where: {},
      order: { round: 'DESC' },
    });
    return await Promise.all(
      addresses.map(async (address) => {
        const roundReward = await this.roundRewardsRepository.findOne({
          where: { address: address.toLowerCase(), round },
          order: { round: 'DESC' },
        });
        return {
          address,
          round,
          reward: roundReward?.reward ?? 0,
        };
      }),
    );
  }

  async getTotalEarned(addresses: string[]) {
    return await Promise.all(
      addresses.map(async (address) => {
        const roundRewards = await this.roundRewardsRepository.find({
          where: { address: address.toLowerCase() },
        });
        return {
          address,
          reward: roundRewards.reduce(
            (roundReward, { reward }) => roundReward + (Number(reward) || 0),
            0,
          ),
        };
      }),
    );
  }

  async getLastRewards(addresses: string[]) {
    const { height } = await this.blockRewardsRepository.findOne({
      where: {},
      order: { height: 'DESC' },
    });
    return await Promise.all(
      addresses.map(async (address) => {
        const blockRewards = await this.blockRewardsRepository.find({
          where: { address: address.toLowerCase() },
          order: { height: 'DESC' },
          take: 60 * 24 * 7,
        });

        const emptyArray = new Array(60 * 24 * 7)
          .fill(0)
          .map((_, i) => height - i);

        const filledArray = [...emptyArray].map((height) => {
          const blockReward = blockRewards.find(
            ({ height: blockRound }) => blockRound === height,
          );
          return {
            height,
            reward: Number(blockReward?.reward) || 0,
            ...blockReward,
          };
        });

        const tmp = {
          address,
          reward: {
            hourly: {
              current: filledArray
                .slice(0, 60)
                .reduce(
                  (roundReward, { reward }) =>
                    roundReward + Number(reward) || 0,
                  0,
                ),
              previous: filledArray
                .slice(60, 60 * 2)
                .reduce(
                  (roundReward, { reward }) => roundReward + Number(reward),
                  0,
                ),
              change: 0,
            },
            daily: {
              current: filledArray
                .slice(0, 60 * 24)
                .reduce(
                  (roundReward, { reward }) => roundReward + Number(reward),
                  0,
                ),
              previous: filledArray
                .slice(60 * 24, 60 * 24 * 2)
                .reduce(
                  (roundReward, { reward }) => roundReward + Number(reward),
                  0,
                ),
              change: 0,
            },
            weekly: {
              current: filledArray
                .slice(0, 60 * 24 * 7)
                .reduce(
                  (roundReward, { reward }) => roundReward + Number(reward),
                  0,
                ),
            },
          },
        };

        tmp.reward.hourly.change =
          ((tmp.reward.hourly.current - tmp.reward.hourly.previous) /
            tmp.reward.hourly.previous || 1) * 100;
        tmp.reward.daily.change =
          ((tmp.reward.daily.current - tmp.reward.daily.previous) /
            tmp.reward.daily.previous || 1) * 100;
        return tmp;
      }),
    );
  }

  async getBlockRewards(addresses: string[], length: number) {
    const latestBlockReward = await this.blockRewardsRepository.findOne({
      where: {},
      order: { height: 'DESC' },
    });
    const latestBlock = latestBlockReward?.height || 0;
    const emptyArray = Array.from({ length }, (_, i) => latestBlock - i);

    return await Promise.all(
      addresses.map(async (address) => {
        const blockRewards = await this.blockRewardsRepository.find({
          where: { address: address.toLowerCase() },
          order: { height: 'DESC' },
          take: length,
        });

        return {
          address,
          blocks: [...emptyArray].map((height) => {
            const blockReward = blockRewards.find(
              ({ height: blockRound }) => blockRound === height,
            );
            return {
              ...blockReward,
              height,
              reward: Number(blockReward?.reward) || 0,
              c001: blockReward?.c001 || 0,
              c002: blockReward?.c002 || 0,
              c003: blockReward?.c003 || 0,
            };
          }),
        };
      }),
    );
  }

  async getAverageRewards(addresses: string[], length: number) {
    return await Promise.all(
      addresses.map(async (address) => {
        const blockRewards = await this.blockRewardsRepository.find({
          where: { address: address.toLowerCase() },
          order: { height: 'DESC' },
          take: length,
        });

        return {
          address,
          reward:
            (blockRewards.reduce(
              (roundReward, { reward }) => roundReward + Number(reward),
              0,
            ) /
              blockRewards.length) *
            60,
        };
      }),
    );
  }

  async getEntireNode(addresses: string, length: number) {
    const walletBalance = (await this.getWalletBalances([addresses]))[0];
    const roundRewards = (await this.getRoundRewards([addresses]))[0];
    const totalEarned = (await this.getTotalEarned([addresses]))[0];
    const lastRewards = (await this.getLastRewards([addresses]))[0];
    const blockRewards = (await this.getBlockRewards([addresses], length))[0];

    return {
      walletBalance,
      roundRewards,
      totalEarned,
      lastRewards,
      blockRewards,
    };
  }
}
