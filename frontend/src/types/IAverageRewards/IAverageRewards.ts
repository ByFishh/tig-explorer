import { averageRewardsSchema } from '@/schemas/AverageRewards';
import { z } from 'zod';

export type IAverageRewards = z.infer<typeof averageRewardsSchema>;
