import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BenchmarkersService } from '../../services/benchmarkers/benchmarkers.service';
import { GetLastRewardsRequestDto } from './get-last-rewards-request.dto';
import { GetRoundRewardsRequestDto } from './get-round-rewards-request';
import { GetWalletBalancesRequestDto } from './get-wallet-balances-request';
import { GetTotalEarnedRequestDto } from './get-total-earned-request';
import { GetBlockRewardsRequestDto } from './get-block-rewards-request.dto';

@Controller('benchmarker')
export class BenchmarkersController {
  constructor(private benchmarkService: BenchmarkersService) {}

  @Post('wallet-balances')
  async getWalletBalances(@Body() params: GetWalletBalancesRequestDto) {
    return {
      wallet_balances: await this.benchmarkService.getWalletBalances(
        params.addresses,
      ),
    };
  }

  @Post('round-rewards')
  async getRoundRewards(@Body() params: GetRoundRewardsRequestDto) {
    return {
      round_rewards: await this.benchmarkService.getRoundRewards(
        params.addresses,
      ),
    };
  }

  @Post('total-earned')
  async getTotalEarned(@Body() params: GetTotalEarnedRequestDto) {
    return {
      total_earned: await this.benchmarkService.getTotalEarned(
        params.addresses,
      ),
    };
  }

  @Post('last-rewards')
  async getLastRewards(@Body() params: GetLastRewardsRequestDto) {
    return {
      last_rewards: await this.benchmarkService.getLastRewards(
        params.addresses,
      ),
    };
  }

  @Post('block-rewards')
  async getBlockRewards(@Body() params: GetBlockRewardsRequestDto) {
    return {
      block_rewards: await this.benchmarkService.getBlockRewards(
        params.addresses,
        params.length,
      ),
    };
  }

  @Post('average-rewards')
  async getAverageRewards(@Body() params: GetBlockRewardsRequestDto) {
    return {
      average_rewards: await this.benchmarkService.getAverageRewards(
        params.addresses,
        params.length,
      ),
    };
  }

  @Get(':address')
  async getNode(@Param('address') id: string) {
    return {
      node: await this.benchmarkService.getNode(id),
    };
  }

  @Get(':address/preview')
  async getNodePreview(@Param('address') id: string) {
    return {
      node: await this.benchmarkService.getNodePreview(id),
    };
  }
}
