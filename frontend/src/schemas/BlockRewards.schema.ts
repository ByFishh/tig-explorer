import { z } from 'zod';
import { addressSchema } from './Address.schema';
import { blockSchema } from './Block.schema';

export const blockRewardsSchema = z.object({
  address: addressSchema.shape.id,
  blocks: z.array(blockSchema),
});
