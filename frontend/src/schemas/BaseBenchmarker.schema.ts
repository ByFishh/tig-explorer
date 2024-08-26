import { z } from 'zod';
import { roundRewardsSchema } from './RoundRewards.schema';
import { totalEarnedSchema } from './TotalEarned.schema';
import { lastRewardsSchema } from './LastRewards.schema';
import { blockRewardsSchema } from './BlockRewards.schema';
import { averageRewardsSchema } from './AverageRewards';
import { roundSchema } from './Round.schema';

export const baseBenchmarkerSchema = z.object({
  address: z.string(),
  average_rewards: averageRewardsSchema,
  round_rewards: roundRewardsSchema,
  total_earned: totalEarnedSchema,
  last_rewards: lastRewardsSchema,
  block_rewards: blockRewardsSchema,
  round: roundSchema,
});
