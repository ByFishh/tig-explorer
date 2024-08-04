import { blockSchema } from '@/schemas/Block.schema';
import { z } from 'zod';

export type IBlock = z.infer<typeof blockSchema>;
