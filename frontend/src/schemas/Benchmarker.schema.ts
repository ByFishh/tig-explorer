import { z } from 'zod';
import { baseBenchmarkerSchema } from './BaseBenchmarker.schema';
import { walletBalanceSchema } from './WalletBalance.schema';

export const benchmarkerSchema = baseBenchmarkerSchema.merge(
  z.object({
    wallet_balance: walletBalanceSchema,
  }),
);
