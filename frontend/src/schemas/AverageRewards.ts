import { z } from 'zod';
import { addressSchema } from './Address.schema';

export const averageRewardsSchema = z.object({
  address: addressSchema.shape.id,
  reward: z.number().default(0),
});
