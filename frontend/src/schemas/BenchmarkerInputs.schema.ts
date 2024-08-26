import { NOTES_MAX_LENGTH } from '@/const/const';
import { z } from 'zod';
import { addressSchema } from './Address.schema';

export const benchmarkerInputsSchema = z.object({
  id: addressSchema.shape.id,
  notes: z
    .string()
    .max(NOTES_MAX_LENGTH, {
      message: `This field may not exceed ${NOTES_MAX_LENGTH} characters`,
    })
    .optional()
    .default(''),
  startDate: z.string().optional().nullable().default(null),
  coreNumber: z.number().optional().default(0),
  serverCost: z.number().optional().default(0),
});
