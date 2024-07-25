import { Body, Controller, Post } from '@nestjs/common';
import { NodeService } from './node.service';
import {
  GetLastRewardsDto,
  GetRoundBalancesDto,
  GetWalletBalancesDto,
} from './node.dtos';

@Controller('node')
export class NodeController {
  constructor(private readonly nodeService: NodeService) {}

  @Post('/wallet-balances')
  async getWalletBalance(@Body() { addresses }: GetWalletBalancesDto) {
    return {
      wallet_balances: await this.nodeService.getWalletBalances(addresses),
    };
  }

  @Post('/round-balances')
  async getRoundBalance(@Body() { addresses, round }: GetRoundBalancesDto) {
    return {
      round_token: await this.nodeService.getRoundBalances(addresses, round),
    };
  }

  @Post('/last-rewards')
  async getLastRewards(@Body() { addresses }: GetLastRewardsDto) {
    return {
      last_rewards: await this.nodeService.getLastRewards(addresses),
    };
  }
}
