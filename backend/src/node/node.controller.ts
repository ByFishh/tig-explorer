import { Body, Controller, Post } from '@nestjs/common';
import { NodeService } from './node.service';
import {
  GetLastBlockRewardsDto,
  GetLastRewardsDto,
  GetRoundBalancesDto,
  GetWalletBalancesDto,
} from './node.dtos';

@Controller('node')
export class NodeController {
  constructor(private readonly nodeService: NodeService) {}

  @Post('/wallet-balances')
  async getWalletBalances(@Body() { addresses }: GetWalletBalancesDto) {
    return {
      wallet_balances: await this.nodeService.getWalletBalances(addresses),
    };
  }

  @Post('/round-balances')
  async getRoundBalances(@Body() { addresses, round }: GetRoundBalancesDto) {
    return {
      round_token: await this.nodeService.getRoundBalances(addresses, round),
    };
  }

  @Post('/last-block-rewards')
  async getLastBlockRewards(
    @Body() { addresses, count }: GetLastBlockRewardsDto,
  ) {
    return {
      last_block_rewards: await this.nodeService.getLastBlockRewards(
        addresses,
        count,
      ),
    };
  }

  @Post('/last-rewards')
  async getLastRewards(@Body() { addresses }: GetLastRewardsDto) {
    return {
      last_rewards: await this.nodeService.getLastRewards(addresses),
    };
  }
}
