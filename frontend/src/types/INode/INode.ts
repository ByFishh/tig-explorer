type IWalletBalance = {
  balance: number;
  address: string;
};

type IRoundRewards = {
  address: string;
  round: number;
  reward: number;
};

type ITotalEarned = {
  address: string;
  reward: number;
};

type ILastRewards = {
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

type IBlockRewards = {
  address: string;
  blocks: IBlock[];
};

type IBlock = {
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

type IAverageRewards = {
  address: string;
  reward: number;
};

export type IBaseNode = {
  round_rewards: IRoundRewards;
  total_earned: ITotalEarned;
  last_rewards: ILastRewards;
  block_rewards: IBlockRewards;
  average_rewards: IAverageRewards;
};

type IWalletNode = {
  wallet_balance: IWalletBalance;
};

export type INode = IBaseNode & IWalletNode;
