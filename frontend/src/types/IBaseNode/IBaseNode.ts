import { baseNodeSchema } from '@/schemas/BaseNode.schema';
import { z } from 'zod';

export type IBaseNode = z.infer<typeof baseNodeSchema>;
