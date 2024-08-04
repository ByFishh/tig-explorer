import { walletBalanceSchema } from '@/schemas/WalletBalance.schema';
import { z } from 'zod';

export type IWalletBalance = z.infer<typeof walletBalanceSchema>;
