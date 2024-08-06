export type WalletBalancesResponse = {
  wallet_balances: { address: string; balance: number }[];
};

export type RoundRewardsResponse = {
  round_rewards: {
    round: number;
    address: string;
    reward: number;
  }[];
};

export type TotalEarnedResponse = {
  total_earned: {
    address: string;
    reward: number;
  }[];
};

export type LastRewardsResponse = {
  last_rewards: {
    address: string;
    reward: {
      hourly: number;
      daily: number;
      weekly: number;
    };
  }[];
};

export type AverageRewardsResponse = {
  average_rewards: {
    address: string;
    reward: number;
  }[];
};

export type BlockRewardsResponse = {
  block_rewards: {
    height: number;
    id: string;
    round: number;
    block_id: string;
    address: string;
    c001: number;
    c002: number;
    c003: number;
    c004: number;
    reward: number;
  }[][];
};
