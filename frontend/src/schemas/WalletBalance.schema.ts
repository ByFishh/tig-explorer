import { z } from 'zod';

export const walletBalanceSchema = z.number().default(0);
