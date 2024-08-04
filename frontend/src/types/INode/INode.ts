import { nodeSchema } from '@/schemas/Node.schema';
import { z } from 'zod';

export type INode = z.infer<typeof nodeSchema>;
