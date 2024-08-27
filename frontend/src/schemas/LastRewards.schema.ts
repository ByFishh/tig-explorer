import { z } from 'zod';

export const lastRewardsSchema = z.object({
  hourly: z.object({
    current: z.number().nullable().default(0),
    previous: z.number().nullable().default(0),
    change: z.number().nullable().default(0),
  }),
  daily: z.object({
    current: z.number().nullable().default(0),
    previous: z.number().nullable().default(0),
    change: z.number().nullable().default(0),
  }),
  weekly: z.object({
    current: z.number().nullable().default(0),
  }),
});
