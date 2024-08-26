import * as z from 'zod';
import { benchmarkerInputsSchema } from '../../schemas/BenchmarkerInputs.schema';

export type IBenchmarkerInputs = z.infer<typeof benchmarkerInputsSchema>;
export type IBenchmarkerInputsDTO = Omit<IBenchmarkerInputs, 'id'>;
