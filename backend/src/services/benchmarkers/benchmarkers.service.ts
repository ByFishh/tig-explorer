import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlockReward, RoundReward } from '../../entities';
import { Repository } from 'typeorm';

@Injectable()
export class BenchmarkersService {
  constructor(
    @InjectRepository(RoundReward)
    private roundRewardsRepository: Repository<RoundReward>,
    @InjectRepository(BlockReward)
    private blockRewardsRepository: Repository<BlockReward>,
  ) {}

  async getCurrentRound() {
    const { round } = await this.roundRewardsRepository.findOne({
      where: {},
      order: { round: 'DESC' },
    });

    return round;
  }

  async getRoundRewards(address: string) {
    const round = await this.getCurrentRound();
    const roundReward = await this.roundRewardsRepository.findOne({
      where: { address: address, round },
      order: { round: 'DESC' },
    });
    return roundReward ? Number(roundReward.reward) : 0;
  }

  async getTotalEarned(address: string) {
    const roundRewards = await this.roundRewardsRepository.find({
      where: { address: address },
    });
    return roundRewards.reduce(
      (roundReward, { reward }) => roundReward + (Number(reward) || 0),
      0,
    );
  }

  async getLastRewards(address: string) {
    const { height } = await this.blockRewardsRepository.findOne({
      where: {},
      order: { height: 'DESC' },
    });
    const blockRewards = await this.blockRewardsRepository.find({
      where: { address: address },
      order: { height: 'DESC' },
      take: 60 * 24 * 7,
    });

    const emptyArray = new Array(60 * 24 * 7).fill(0).map((_, i) => height - i);

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
      hourly: {
        current: filledArray
          .slice(0, 60)
          .reduce(
            (roundReward, { reward }) => roundReward + Number(reward) || 0,
            0,
          ),
        previous: filledArray
          .slice(60, 60 * 2)
          .reduce((roundReward, { reward }) => roundReward + Number(reward), 0),
        change: 0,
      },
      daily: {
        current: filledArray
          .slice(0, 60 * 24)
          .reduce((roundReward, { reward }) => roundReward + Number(reward), 0),
        previous: filledArray
          .slice(60 * 24, 60 * 24 * 2)
          .reduce((roundReward, { reward }) => roundReward + Number(reward), 0),
        change: 0,
      },
      weekly: {
        current: filledArray
          .slice(0, 60 * 24 * 7)
          .reduce((roundReward, { reward }) => roundReward + Number(reward), 0),
      },
    };

    tmp.hourly.change =
      ((tmp.hourly.current - tmp.hourly.previous) / tmp.hourly.previous || 1) *
        100 || 0;
    tmp.daily.change =
      ((tmp.daily.current - tmp.daily.previous) / tmp.daily.previous || 1) *
        100 || 0;
    return tmp;
  }

  async getBlockRewards(address: string, length: number) {
    const latestBlockReward = await this.blockRewardsRepository.findOne({
      where: {},
      order: { height: 'DESC' },
    });
    const latestBlock = latestBlockReward?.height || 0;
    const emptyArray = Array.from({ length }, (_, i) => latestBlock - i);

    const blockRewards = await this.blockRewardsRepository.find({
      where: { address: address },
      order: { height: 'DESC' },
      take: length,
    });

    return [...emptyArray]
      .map((height) => {
        const blockReward = blockRewards.find(
          ({ height: blockRound }) => blockRound === height,
        );
        return {
          height,
          reward: Number(blockReward?.reward) || 0,
          c001: blockReward?.c001 || 0,
          c002: blockReward?.c002 || 0,
          c003: blockReward?.c003 || 0,
          c004: blockReward?.c004 || 0,
        };
      })
      .reverse();
  }

  async getAverageRewards(address: string, length: number) {
    const blockRewards = await this.blockRewardsRepository.find({
      where: { address: address },
      order: { height: 'DESC' },
      take: length,
    });

    return (
      (blockRewards.reduce(
        (roundReward, { reward }) => roundReward + Number(reward),
        0,
      ) /
        blockRewards.length) *
      60
    );
  }

  async getBenchmarker(address: string) {
    const [
      round,
      roundRewards,
      totalEarned,
      averageRewards,
      lastRewards,
      blockRewards,
    ] = await Promise.all([
      this.getCurrentRound(),
      this.getRoundRewards(address),
      this.getTotalEarned(address),
      this.getAverageRewards(address, 120),
      this.getLastRewards(address),
      this.getBlockRewards(address, 120),
    ]);

    return {
      address,
      round,
      round_rewards: roundRewards,
      total_earned: totalEarned,
      average_rewards: averageRewards || 0,
      last_rewards: lastRewards,
      block_rewards: blockRewards,
    };
  }

  async getBenchmarkerPreview(address: string) {
    const [totalEarned, averageRewards] = await Promise.all([
      this.getTotalEarned(address),
      this.getAverageRewards(address, 120),
    ]);

    return {
      address,
      total_earned: totalEarned,
      average_rewards: averageRewards || 0,
    };
  }
}
