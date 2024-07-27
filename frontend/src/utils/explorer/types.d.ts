export type WalletBalancesResponse = {
  wallet_balances: string[];
};

export type RoundBalancesResponse = {
  round_token: string[];
};

export type LastBlockRewardsResponse = {
  last_block_rewards: {
    height: number;
    round: number;
    block_id: string;
    c001: number;
    c002: number;
    c003: number;
    reward: string;
  }[][];
};

export type LastRewardsResponse = {
  last_rewards: {
    last_hour: string;
    last_day: string;
  }[];
};
