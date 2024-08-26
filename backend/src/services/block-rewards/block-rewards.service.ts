import { BlockReward } from '../../entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TigService } from '../../services/tig/tig.service';
import { Repository } from 'typeorm';
import { formatEther } from 'viem';

@Injectable()
export class BlockRewardsService {
  constructor(
    private tigService: TigService,
    @InjectRepository(BlockReward)
    private blockRewardsRepository: Repository<BlockReward>,
  ) {}

  async retrieveLatestBlockRewards() {
    const {
      block: { id },
    } = await this.tigService.getBlock();
    const blockRewardsExist = await this.blockRewardsRepository.findOne({
      where: { block_id: id },
    });
    if (blockRewardsExist) return;
    const blockRewards = await this.getBlockRewards(id);
    await this.blockRewardsRepository.save(blockRewards);
  }

  async getBlockRewards(id: string) {
    const getPlayersResponse = await this.tigService.getPlayers(
      'benchmarker',
      id,
    );
    let blockRewards = [];
    getPlayersResponse.players.forEach((player) => {
      const challenges = player.block_data.num_qualifiers_by_challenge;
      if (!challenges) return;
      blockRewards.push({
        height: getPlayersResponse.block_details.height,
        round: getPlayersResponse.block_details.round,
        block_id: getPlayersResponse.block_id,
        address: player.id,
        c001: player.block_data.num_qualifiers_by_challenge?.c001 ?? 0,
        c002: player.block_data.num_qualifiers_by_challenge?.c002 ?? 0,
        c003: player.block_data.num_qualifiers_by_challenge?.c003 ?? 0,
        c004: player.block_data.num_qualifiers_by_challenge?.c004 ?? 0,
        reward: Number(formatEther(BigInt(player.block_data.reward))),
      });
    });
    return blockRewards;
  }
}
