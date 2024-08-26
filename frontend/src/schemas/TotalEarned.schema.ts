import { z } from 'zod';

export const totalEarnedSchema = z.number().optional().default(0);
