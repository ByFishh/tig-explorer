import axios from 'axios';
import {
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
      addresses: addresses,
    },
  );

  return response.data;
};

export const getRoundRewards = async (addresses: string[]) => {
  const response = await axios.post<RoundRewardsResponse>(
    `${baseApiUrl}/nodes/round-rewards`,
    {
      addresses: addresses,
    },
  );

  return response.data;
};

export const getTotalEarned = async (addresses: string[]) => {
  const response = await axios.post<TotalEarnedResponse>(
    `${baseApiUrl}/nodes/total-earned`,
    {
      addresses: addresses,
    },
  );

  return response.data;
};

export const getLastRewards = async (addresses: string[]) => {
  const response = await axios.post<LastRewardsResponse>(
    `${baseApiUrl}/nodes/last-rewards`,
    {
      addresses: addresses,
    },
  );

  return response.data;
};
