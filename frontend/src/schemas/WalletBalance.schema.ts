import { z } from 'zod';
import { addressSchema } from './Address.schema';

export const walletBalanceSchema = z.object({
  balance: z.number().default(0),
  address: addressSchema.shape.id,
});
