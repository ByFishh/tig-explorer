import axios from 'axios';
import {
  BlockRewardsResponse,
  LastRewardsResponse,
  RoundRewardsResponse,
  TotalEarnedResponse,
  WalletBalancesResponse,
} from '@/utils/explorer/types';

const baseApiUrl = 'http://byfish.fr:8083';

export const getWalletBalances = async (addresses: string[]) => {
  const response = await axios.post<WalletBalancesResponse>(
    `${baseApiUrl}/nodes/wallet-balances`,
    {
      addresses,
    },
  );

  return response.data;
};

export const getRoundRewards = async (addresses: string[]) => {
  const response = await axios.post<RoundRewardsResponse>(
    `${baseApiUrl}/nodes/round-rewards`,
    {
      addresses,
    },
  );

  return response.data;
};

export const getTotalEarned = async (addresses: string[]) => {
  const response = await axios.post<TotalEarnedResponse>(
    `${baseApiUrl}/nodes/total-earned`,
    {
      addresses,
    },
  );

  return response.data;
};

export const getLastRewards = async (addresses: string[]) => {
  const response = await axios.post<LastRewardsResponse>(
    `${baseApiUrl}/nodes/last-rewards`,
    {
      addresses,
    },
  );

  return response.data;
};

export const getBlockRewards = async (addresses: string[], length: number) => {
  const response = await axios.post<BlockRewardsResponse>(
    `${baseApiUrl}/nodes/block-rewards`,
    {
      addresses,
      length,
    },
  );

  return response.data;
};
