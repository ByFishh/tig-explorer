'use client';

import useSWR from 'swr';
import {
  getLastBlockRewards,
  getLastRewards,
  getRoundBalances,
  getWalletBalances,
} from '@/utils/explorer/api';
import { formatEther, parseEther } from 'viem';

export const usePageLogic = (address: string) => {
  const walletBalanceSWR = useSWR('walletBalance', async () => {
    const balances = await getWalletBalances([address]);
    return formatEther(balances[0]);
  });
  const roundBalancesSWR = useSWR('roundBalances', async () => {
    const balances = await getRoundBalances([address]);
    return formatEther(balances[0]);
  });
  const lastBlockRewardsSWR = useSWR('lastBlockRewards', async () => {
    const rewards = await getLastBlockRewards([address], 60);

    return rewards[0];
  });
  const lastRewardsSWR = useSWR('lastRewards', async () => {
    const rewards = await getLastRewards([address]);
    return {
      last_hour: formatEther(rewards[0].last_hour),
      last_day: formatEther(rewards[0].last_day),
    };
  });

  return {
    walletBalanceSWR,
    roundBalancesSWR,
    lastBlockRewardsSWR,
    lastRewardsSWR,
    address,
  };
};
