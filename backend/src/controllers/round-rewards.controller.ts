import { Controller, Get } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RoundRewardsService } from '../services';

@Controller('round-rewards')
export class RoundRewardsController {
  constructor(private roundRewardsService: RoundRewardsService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async retrieveLatestRoundRewards() {
    await this.roundRewardsService.retrieveLatestRoundRewards();
  }

  @Get('retrieve-round-rewards')
  async retrieveBlockRewards() {
    this.roundRewardsService.retrieveRoundRewards();
  }
}
