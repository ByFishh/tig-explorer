import { benchmarkerSchema } from '@/schemas/Benchmarker.schema';
import { z } from 'zod';

export type IBenchmarker = z.infer<typeof benchmarkerSchema>;
