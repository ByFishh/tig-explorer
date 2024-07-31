export type INode = {
  wallet_balance: IWalletBalance;
  round_rewards: IRoundRewards;
  total_earned: ITotalEarned;
  last_rewards: ILastRewards;
  average_rewards: IAverageRewards;
  block_rewards: IBlockRewards;
};

export type IWalletBalance = {
  balance: number;
  address: string;
};

export type IRoundRewards = {
  address: string;
  round: number;
  reward: number;
};

export type ITotalEarned = {
  address: string;
  reward: number;
};

export type ILastRewards = {
  address: string;
  reward: {
    hourly: {
      current: number;
      previous: number;
      change: number;
    };
    daily: {
      current: number;
      previous: number;
      change: number;
    };
    weekly: {
      current: number;
    };
  };
};

export type IAverageRewards = {
  address: string;
  reward: number;
};

export type IBlockRewards = {
  address: string;
  blocks: IBlock[];
};

export type IBlock = {
  id: string;
  height: number;
  round: number;
  block_id: string;
  address: string;
  c001: number;
  c002: number;
  c003: number;
  reward: number;
};
