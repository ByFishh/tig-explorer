import { z } from 'zod';
import { addressSchema } from './Address.schema';

export const totalEarnedSchema = z.object({
  address: addressSchema.shape.id,
  reward: z.number().default(0),
});
