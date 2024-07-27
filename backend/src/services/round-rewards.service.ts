import { Injectable } from '@nestjs/common';
import { TigService } from './tig.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoundReward } from '../entities';
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
