import { z } from 'zod';

export const blockSchema = z.object({
  height: z.number(),
  c001: z.number(),
  c002: z.number(),
  c003: z.number(),
  c004: z.number(),
  reward: z.number(),
});
