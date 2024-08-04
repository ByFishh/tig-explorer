import { totalEarnedSchema } from '@/schemas/TotalEarned.schema';
import { z } from 'zod';

export type ITotalEarned = z.infer<typeof totalEarnedSchema>;
