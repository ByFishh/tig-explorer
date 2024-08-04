import { z } from 'zod';
import { addressSchema } from './Address.schema';

export const blockSchema = z.object({
  id: z.string().min(1),
  height: z.number(),
  round: z.number().nullable().default(0),
  block_id: z.string().min(1),
  address: addressSchema.shape.id,
  c001: z.number(),
  c002: z.number(),
  c003: z.number(),
  reward: z.number(),
});
