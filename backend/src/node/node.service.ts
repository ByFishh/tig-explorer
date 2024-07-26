import { BadRequestException, Injectable } from '@nestjs/common';
import { base } from 'viem/chains';
import { Address, createPublicClient, http, parseAbi } from 'viem';
import { InjectRepository } from '@nestjs/typeorm';
import { RoundEntity } from '../entities/round.entity';
import { Repository } from 'typeorm';
import axios from 'axios';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BlockRewardEntity } from '../entities/block-reward.entity';

@Injectable()
export class NodeService {
  private _publicClient = createPublicClient({
    chain: base,
    transport: http(),
  });
  private _tigAddress: Address = '0x0c03ce270b4826ec62e7dd007f0b716068639f7b';

  constructor(
    @InjectRepository(RoundEntity)
    private roundEntityRepository: Repository<RoundEntity>,
    @InjectRepository(BlockRewardEntity)
    private blockRewardEntityRepository: Repository<BlockRewardEntity>,
  ) {}

  async getWalletBalances(addresses: Address[]) {
    try {
      return (
        await Promise.all(
          addresses.map((address) =>
            this._publicClient.readContract({
              address: this._tigAddress,
              abi: parseAbi([
                'function balanceOf(address) public view returns (uint256)',
              ]),
              functionName: 'balanceOf',
              args: [address],
            }),
          ),
        )
      ).map((result) => result.toString());
    } catch (e) {
      throw new BadRequestException(e.shortMessage);
    }
  }

  async getRoundBalances(addresses: Address[], round?: number) {}

  async getLastBlockRewards(addresses: Address[], count: number) {
    return await Promise.all(
      addresses.map(async (address) => {
        const rewards = await this.blockRewardEntityRepository.find({
          where: { address: address.toLowerCase() },
          order: { height: 'DESC' },
          take: count,
        });

        return rewards.map((reward) => {
          return {
            height: reward.height,
            round: reward.round,
            block_id: reward.block_id,
            c001: reward.c001,
            c002: reward.c002,
            c003: reward.c003,
            reward: reward.reward,
          };
        });
      }),
    );
  }

  async getLastRewards(addresses: Address[]) {
    return await Promise.all(
      addresses.map(async (address) => {
        const rewards = await this.blockRewardEntityRepository.find({
          where: { address: address.toLowerCase() },
          order: { height: 'DESC' },
          take: 60 * 24,
        });

        let lastHour = BigInt(0);
        let lastDay = BigInt(0);

        rewards.forEach((reward, index) => {
          if (index < 60) lastHour += BigInt(reward.reward);

          lastDay += BigInt(reward.reward);
        });

        return {
          last_hour: lastHour.toString(),
          last_day: lastDay.toString(),
        };
      }),
    );
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async cronJob() {
    await this.getCurrentRound();
    await this.getCurrentBlock();
  }

  async getCurrentBlock() {
    const roundEntity = await this.roundEntityRepository
      .createQueryBuilder('round')
      .orderBy('round.round', 'DESC')
      .limit(1)
      .getOne();
    const response = await axios.get(
      `https://mainnet-api.tig.foundation/get-players?player_type=benchmarker&block_id=${roundEntity.id}`,
    );
    const height = response.data.block_details.height;
    const round = response.data.block_details.round;
    const block_id = response.data.block_id;
    const players = response.data.players;
    const blockRewards = [];

    players.forEach((player) => {
      const challenges = player.block_data.num_qualifiers_by_challenge;

      if (!challenges) {
        return;
      }

      blockRewards.push({
        height,
        round,
        block_id,
        address: player.id.toLowerCase(),
        c001: challenges?.c001 ?? 0,
        c002: challenges?.c002 ?? 0,
        c003: challenges?.c003 ?? 0,
        reward: player.block_data.reward,
      });
    });

    await this.blockRewardEntityRepository.save(blockRewards);
  }

  async getCurrentRound() {
    const response = await axios.get(
      `https://mainnet-api.tig.foundation/get-block`,
    );

    const roundNumber = response.data.block.details.round;

    const round = await this.roundEntityRepository.findOneBy({
      round: roundNumber,
    });

    if (round) {
      return await this.roundEntityRepository.update(round, {
        id: response.data.block.id,
      });
    }

    const newRound = this.roundEntityRepository.create({
      id: response.data.block.id,
      round: response.data.block.details.round,
    });

    await this.roundEntityRepository.save(newRound);
  }
}
