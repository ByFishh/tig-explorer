import { roundRewardsSchema } from '@/schemas/RoundRewards.schema';
import { z } from 'zod';

export type IRoundRewards = z.infer<typeof roundRewardsSchema>;
