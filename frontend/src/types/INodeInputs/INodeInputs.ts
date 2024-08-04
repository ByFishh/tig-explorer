import * as z from 'zod';
import { nodeInputsSchema } from '../../schemas/NodeInputs.schema';

export type INodeInputs = z.infer<typeof nodeInputsSchema>;
export type INodeInputsDTO = Omit<INodeInputs, 'id'>;
