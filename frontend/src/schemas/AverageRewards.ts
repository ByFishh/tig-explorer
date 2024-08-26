import { z } from 'zod';

export const averageRewardsSchema = z.number().optional().default(0);
