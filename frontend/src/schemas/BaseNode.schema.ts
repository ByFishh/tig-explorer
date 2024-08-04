import { z } from 'zod';
import { roundRewardsSchema } from './RoundRewards.schema';
import { totalEarnedSchema } from './TotalEarned.schema';
import { lastRewardsSchema } from './LastRewards.schema';
import { blockRewardsSchema } from './BlockRewards.schema';
import { averageRewardsSchema } from './AverageRewards';

export const baseNodeSchema = z.object({
  average_rewards: averageRewardsSchema,
  round_rewards: roundRewardsSchema,
  total_earned: totalEarnedSchema,
  last_rewards: lastRewardsSchema,
  block_rewards: blockRewardsSchema,
});
