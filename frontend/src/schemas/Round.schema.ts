import { z } from 'zod';

export const roundSchema = z.number().optional().default(0);
