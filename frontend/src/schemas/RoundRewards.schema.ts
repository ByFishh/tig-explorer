import { z } from 'zod';

export const roundRewardsSchema = z.number().optional().default(0);
