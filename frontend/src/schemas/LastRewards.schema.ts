import { z } from 'zod';
import { addressSchema } from './Address.schema';

export const lastRewardsSchema = z.object({
  address: addressSchema.shape.id,
  reward: z.object({
    hourly: z.object({
      current: z.number().nullable().default(null),
      previous: z.number().nullable().default(null),
      change: z.number().nullable().default(null),
    }),
    daily: z.object({
      current: z.number().nullable().default(null),
      previous: z.number().nullable().default(null),
      change: z.number().nullable().default(null),
    }),
    weekly: z.object({
      current: z.number().nullable().default(null),
    }),
  }),
});
