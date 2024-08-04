import { z } from 'zod';
import { addressSchema } from './Address.schema';

export const roundRewardsSchema = z.object({
  address: addressSchema.shape.id,
  round: z.number().default(0),
  reward: z.number().default(0),
});
