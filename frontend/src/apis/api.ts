import axios from 'axios';
import {
  WalletBalancesResponse,
  BlockRewardsResponse,
  LastRewardsResponse,
  RoundRewardsResponse,
  TotalEarnedResponse,
  AverageRewardsResponse,
} from '@/types/types';
import {
  IAverageRewards,
  IBlockRewards,
  ILastRewards,
  INode,
  IRoundRewards,
  ITotalEarned,
  IWalletBalance,
} from '@/types/INode/INode';

const baseApiUrl = 'https://api.tig-explorer.com';

export const getWalletBalances = async (addresses: string[]) => {
  const response = await axios.post<{ wallet_balances: IWalletBalance[] }>(
    `${baseApiUrl}/nodes/wallet-balances`,
    {
      addresses,
    },
  );

  return response.data;
};

export const getRoundRewards = async (addresses: string[]) => {
  const response = await axios.post<{ round_rewards: IRoundRewards[] }>(
    `${baseApiUrl}/nodes/round-rewards`,
    {
      addresses,
    },
  );

  return response.data;
};

export const getTotalEarned = async (addresses: string[]) => {
  const response = await axios.post<{ total_earned: ITotalEarned[] }>(
    `${baseApiUrl}/nodes/total-earned`,
    {
      addresses,
    },
  );

  return response.data;
};

export const getLastRewards = async (addresses: string[]) => {
  const response = await axios.post<{ last_rewards: ILastRewards[] }>(
    `${baseApiUrl}/nodes/last-rewards`,
    {
      addresses,
    },
  );

  return response.data;
};

export const getAverageRewards = async (
  addresses: string[],
  length: number,
) => {
  const response = await axios.post<{ average_rewards: IAverageRewards[] }>(
    `${baseApiUrl}/nodes/average-rewards`,
    {
      addresses,
      length,
    },
  );

  return response.data;
};

export const getBlockRewards = async (addresses: string[], length: number) => {
  const response = await axios.post<{ block_rewards: IBlockRewards[] }>(
    `${baseApiUrl}/nodes/block-rewards`,
    {
      addresses,
      length,
    },
  );

  return response.data;
};

export const getEntireNode = async (address: string, length: number) => {
  const response = await axios.post<{ entire_node: INode }>(
    `${baseApiUrl}/nodes/entire-node`,
    {
      address,
      length,
    },
  );

  return response.data.entire_node;
};

export const getEntireNodes = async (addresses: string[], length: number) => {
  //const getWalletBalancesResponse = await getWalletBalances(addresses);
  //const getRoundRewardsResponse = await getRoundRewards(addresses);
  const getTotalEarnedResponse = await getTotalEarned(addresses);
  const getLastRewardsResponse = await getLastRewards(addresses);
  //const getAverageRewardsResponse = await getAverageRewards(addresses, length);

  return addresses.map((_, index) => {
    return {
      // wallet_balance: getWalletBalancesResponse.wallet_balances[index],
      // round_rewards: getRoundRewardsResponse.round_rewards[index],
      total_earned: getTotalEarnedResponse.total_earned[index],
      last_rewards: getLastRewardsResponse.last_rewards[index],
      // average_rewards: getAverageRewardsResponse.average_rewards[index],
    };
  });
};
