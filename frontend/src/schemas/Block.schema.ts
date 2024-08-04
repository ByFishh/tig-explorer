import { z } from 'zod';
import { addressSchema } from './Address.schema';

export const blockSchema = z.object({
  id: z.string().optional(),
  height: z.number(),
  round: z.number().nullable().default(0),
  block_id: z.string().optional(),
  address: addressSchema.shape.id.optional(),
  c001: z.number(),
  c002: z.number(),
  c003: z.number(),
  reward: z.number(),
});
