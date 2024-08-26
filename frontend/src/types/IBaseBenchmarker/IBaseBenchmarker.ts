import { baseBenchmarkerSchema } from '@/schemas/BaseBenchmarker.schema';
import { z } from 'zod';

export type IBaseBenchmarker = z.infer<typeof baseBenchmarkerSchema>;
