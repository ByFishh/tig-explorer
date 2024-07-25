import { Address } from 'viem';

export class GetWalletBalancesDto {
  addresses: Address[];
}

export class GetRoundBalancesDto {
  round?: number;
  addresses: Address[];
}

export class GetLastRewardsDto {
  addresses: Address[];
}
