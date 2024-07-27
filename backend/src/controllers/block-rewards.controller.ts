import { Controller } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BlockRewardsService } from '../services';

@Controller('block-rewards')
export class BlockRewardsController {
  constructor(private blockRewardsService: BlockRewardsService) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async retrieveLatestBlockRewards() {
    await this.blockRewardsService.retrieveLatestBlockRewards();
  }
}
