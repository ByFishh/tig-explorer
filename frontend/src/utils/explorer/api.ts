import axios from 'axios';
import {
  LastBlockRewardsResponse,
  LastRewardsResponse,
  RoundBalancesResponse,
  WalletBalancesResponse,
} from '@/utils/explorer/types';

const baseApiUrl = 'http://byfish.fr:8083';

export const getWalletBalances = async (
  addresses: string[],
): Promise<bigint[]> => {
  const response = await axios.post<WalletBalancesResponse>(
    `${baseApiUrl}/node/wallet-balances`,
    {
      addresses: addresses,
    },
  );

  return response.data.wallet_balances.map((balance) => BigInt(balance));
};

export const getRoundBalances = async (
  addresses: string[],
  round?: number,
): Promise<bigint[]> => {
  const response = await axios.post<RoundBalancesResponse>(
    `${baseApiUrl}/node/round-balances`,
    {
      addresses: addresses,
      round: round,
    },
  );

  return response.data.round_token.map((balance) => BigInt(balance));
};

export const getLastBlockRewards = async (
  addresses: string[],
  count: number,
) => {
  const response = await axios.post<LastBlockRewardsResponse>(
    `${baseApiUrl}/node/last-block-rewards`,
    {
      addresses: addresses,
      count: count,
    },
  );

  return response.data.last_block_rewards.map((address) =>
    address.map((reward) => ({
      ...reward,
      reward: BigInt(reward.reward),
    })),
  );
};

export const getLastRewards = async (addresses: string[]) => {
  const response = await axios.post<LastRewardsResponse>(
    `${baseApiUrl}/node/last-rewards`,
    {
      addresses: addresses,
    },
  );

  return response.data.last_rewards.map((reward) => ({
    last_hour: BigInt(reward.last_hour),
    last_day: BigInt(reward.last_day),
  }));
};
