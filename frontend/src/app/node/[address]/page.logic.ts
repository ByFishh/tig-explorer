'use client';

import useSWR from 'swr';
import {
  getBlockRewards,
  getLastRewards,
  getRoundRewards,
  getTotalEarned,
  getWalletBalances,
} from '@/utils/explorer/api';

export const usePageLogic = (address: string) => {
  const walletBalanceSWR = useSWR('walletBalance', async () => {
    const response = await getWalletBalances([address.toLowerCase()]);
    return response.wallet_balances[0];
  });
  const roundRewardsSWR = useSWR('roundRewards', async () => {
    const response = await getRoundRewards([address.toLowerCase()]);
    return response.round_rewards[0];
  });
  const totalEarnedSWR = useSWR('totalEarned', async () => {
    const response = await getTotalEarned([address.toLowerCase()]);
    return response.total_earned[0];
  });
  const lastRewardsSWR = useSWR('lastRewards', async () => {
    const response = await getLastRewards([address.toLowerCase()]);
    return response.last_rewards[0];
  });
  const blockRewardsSWR = useSWR('blockRewards', async () => {
    const response = await getBlockRewards([address.toLowerCase()], 60);

    return response.block_rewards[0].reverse();
  });

  return {
    address,
    walletBalanceSWR,
    roundRewardsSWR,
    totalEarnedSWR,
    lastRewardsSWR,
    blockRewardsSWR,
  };
};
