import { Address } from 'viem';

export class GetWalletBalancesDto {
  addresses: Address[];
}

export class GetRoundBalancesDto {
  round?: number;
  addresses: Address[];
}

export class GetLastBlockRewardsDto {
  addresses: Address[];
  count: number;
}

export class GetLastRewardsDto {
  addresses: Address[];
}
