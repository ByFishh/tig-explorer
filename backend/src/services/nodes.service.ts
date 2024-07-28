import { BadRequestException, Injectable } from '@nestjs/common';
import { Address, createPublicClient, formatEther, http, parseAbi } from 'viem';
import { base } from 'viem/chains';
import { InjectRepository } from '@nestjs/typeorm';
import { BlockReward, RoundReward } from '../entities';
import { Repository } from 'typeorm';

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
          balance: formatEther(
            await this._publicClient.readContract({
              address: '0x0c03ce270b4826ec62e7dd007f0b716068639f7b',
              abi: parseAbi([
                'function balanceOf(address) public view returns (uint256)',
              ]),
              functionName: 'balanceOf',
              args: [address as Address],
            }),
          ),
          address,
        })),
      );
    } catch (e) {
      throw new BadRequestException(e.shortMessage);
    }
  }

  async getRoundRewards(addresses: string[]) {
    return await Promise.all(
      addresses.map(async (address) => {
        const { reward } = await this.roundRewardsRepository.findOne({
          where: { address },
          order: { round: 'DESC' },
        });
        return {
          address,
          reward,
        };
      }),
    );
  }

  async getTotalEarned(addresses: string[]) {
    return await Promise.all(
      addresses.map(async (address) => {
        const roundRewards = await this.roundRewardsRepository.find({
          where: { address },
        });
        return {
          address,
          reward: roundRewards.reduce(
            (roundReward, { reward }) => roundReward + Number(reward),
            0,
          ),
        };
      }),
    );
  }

  async getLastRewards(addresses: string[]) {
    return await Promise.all(
      addresses.map(async (address) => {
        const blockRewards = await this.blockRewardsRepository.find({
          where: { address },
          order: { height: 'DESC' },
          take: 60 * 24 * 7,
        });

        return {
          address,
          reward: {
            hourly: blockRewards
              .slice(0, 60)
              .reduce(
                (roundReward, { reward }) => roundReward + Number(reward),
                0,
              ),
            daily: blockRewards
              .slice(0, 60 * 24)
              .reduce(
                (roundReward, { reward }) => roundReward + Number(reward),
                0,
              ),
            weekly: blockRewards
              .slice(0, 60 * 24 * 7)
              .reduce(
                (roundReward, { reward }) => roundReward + Number(reward),
                0,
              ),
          },
        };
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
          where: { address },
          order: { height: 'DESC' },
          take: length,
        });

        return [...emptyArray].map((height) => {
          const blockReward = blockRewards.find(
            ({ height: blockRound }) => blockRound === height,
          );
          return {
            height,
            reward: Number(blockReward?.reward) || 0,
            ...blockReward,
          };
        });
      }),
    );
  }
}
