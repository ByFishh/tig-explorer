import { z } from 'zod';
import { baseNodeSchema } from './BaseNode.schema';
import { walletBalanceSchema } from './WalletBalance.schema';

export const nodeSchema = baseNodeSchema.merge(
  z.object({
    wallet_balance: walletBalanceSchema,
  }),
);
