import { Body, Controller, Post } from '@nestjs/common';
import { NodesService } from '../services';
import { GetLastRewardsDto } from '../dtos/get-last-rewards.dto';
import { GetRoundRewardsDto } from '../dtos/get-round-rewards';
import { GetWalletBalancesDto } from '../dtos/get-wallet-balances';
import { GetTotalEarnedDto } from '../dtos/get-total-earned';

@Controller('nodes')
export class NodesController {
  constructor(private nodesService: NodesService) {}

  @Post('wallet-balances')
  async getWalletBalances(@Body() params: GetWalletBalancesDto) {
    return await this.nodesService.getWalletBalances(params.addresses);
  }

  @Post('round-rewards')
  async getRoundRewards(@Body() params: GetRoundRewardsDto) {
    return await this.nodesService.getRoundRewards(params.addresses);
  }

  @Post('total-earned')
  async getTotalEarned(@Body() params: GetTotalEarnedDto) {
    return await this.nodesService.getTotalEarned(params.addresses);
  }

  @Post('last-rewards')
  async getLastRewards(@Body() params: GetLastRewardsDto) {
    return await this.nodesService.getLastRewards(params.addresses);
  }

  @Post('block-rewards')
  async getBlockRewards(@Body() params: GetLastRewardsDto) {
    return await this.nodesService.getBlockRewards(
      params.addresses,
      params.timeframe,
    );
  }
}
