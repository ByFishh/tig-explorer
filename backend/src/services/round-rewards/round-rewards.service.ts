import { Injectable } from '@nestjs/common';
import { TigService } from '../tig/tig.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoundReward } from '../../entities/round-reward.entity';
import { formatEther } from 'viem';

@Injectable()
export class RoundRewardsService {
  constructor(
    private tigService: TigService,
    @InjectRepository(RoundReward)
    private roundRewardsRepository: Repository<RoundReward>,
  ) {}

  // 2
  async retrieveLatestRoundRewards() {
    const {
      block: {
        id,
        details: { round },
      },
    } = await this.tigService.getBlock();
    const roundExist = await this.roundRewardsRepository.findOne({
      where: { round },
    });

    const currentRoundRewards = await this.getRoundRewards(id);

    if (roundExist) await this.roundRewardsRepository.delete({ round });

    await this.roundRewardsRepository.save(currentRoundRewards);
  }

  async retrieveRoundRewards() {
    const {
      block: {
        details: { round },
      },
    } = await this.tigService.getBlock();

    for (let i = 25; i <= round; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const roundId = await this.getRoundId(i);
      const roundExist = await this.roundRewardsRepository.findOne({
        where: { round: i },
      });

      if (roundExist) continue;

      const roundRewards = await this.getRoundRewards(roundId);
      await this.roundRewardsRepository.save(roundRewards);
      console.log(`Round ${i} rewards saved`);
    }
  }

  // 1
  async getRoundId(round: number) {
    const {
      block: { id },
    } = await this.tigService.getBlock(round);
    return id;
  }

  // 1
  async getRoundRewards(id: string) {
    const {
      players,
      block_details: { round },
    } = await this.tigService.getPlayers('benchmarker', id);
    return players.map((player) => ({
      round,
      address: player.id,
      reward: Number(formatEther(BigInt(player.block_data.round_earnings))),
    }));
  }
}
