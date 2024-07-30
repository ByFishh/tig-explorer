import { Body, Controller, Post } from '@nestjs/common';
import { NodesService } from '../services';
import { GetLastRewardsDto } from '../dtos/get-last-rewards.dto';
import { GetRoundRewardsDto } from '../dtos/get-round-rewards';
import { GetWalletBalancesDto } from '../dtos/get-wallet-balances';
import { GetTotalEarnedDto } from '../dtos/get-total-earned';
import { GetBlockRewardsDto } from '../dtos/get-block-rewards.dto';
import { GetEntireNodeDto } from '../dtos/get-entire-node.dto';

@Controller('nodes')
export class NodesController {
  constructor(private nodesService: NodesService) {}

  @Post('wallet-balances')
  async getWalletBalances(@Body() params: GetWalletBalancesDto) {
    return {
      wallet_balances: await this.nodesService.getWalletBalances(
        params.addresses,
      ),
    };
  }

  @Post('round-rewards')
  async getRoundRewards(@Body() params: GetRoundRewardsDto) {
    return {
      round_rewards: await this.nodesService.getRoundRewards(params.addresses),
    };
  }

  @Post('total-earned')
  async getTotalEarned(@Body() params: GetTotalEarnedDto) {
    return {
      total_earned: await this.nodesService.getTotalEarned(params.addresses),
    };
  }

  @Post('last-rewards')
  async getLastRewards(@Body() params: GetLastRewardsDto) {
    return {
      last_rewards: await this.nodesService.getLastRewards(params.addresses),
    };
  }

  @Post('block-rewards')
  async getBlockRewards(@Body() params: GetBlockRewardsDto) {
    return {
      block_rewards: await this.nodesService.getBlockRewards(
        params.addresses,
        params.length,
      ),
    };
  }

  @Post('average-rewards')
  async getAverageRewards(@Body() params: GetBlockRewardsDto) {
    return {
      average_rewards: await this.nodesService.getAverageRewards(
        params.addresses,
        params.length,
      ),
    };
  }

  @Post('entire-node')
  async getEntireNode(@Body() params: GetEntireNodeDto) {
    return {
      entire_node: await this.nodesService.getEntireNode(
        params.address,
        params.length,
      ),
    };
  }
}
