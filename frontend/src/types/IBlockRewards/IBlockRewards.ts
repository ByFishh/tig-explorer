import { blockRewardsSchema } from '@/schemas/BlockRewards.schema';
import { z } from 'zod';

export type IBlockRewards = z.infer<typeof blockRewardsSchema>;
