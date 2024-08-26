import { z } from 'zod';
import { blockSchema } from './Block.schema';

export const blockRewardsSchema = z.array(blockSchema);
