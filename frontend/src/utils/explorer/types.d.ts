export type WalletBalancesResponse = {
  wallet_balances: { address: string; balance: number }[];
};

export type RoundRewardsResponse = {
  round_rewards: {
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
