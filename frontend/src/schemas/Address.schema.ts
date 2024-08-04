import { ADDRESS_MAX_LENGTH, ADDRESS_MIN_LENGTH } from '@/const/const';
import { z } from 'zod';

export const addressSchema = z.object({
  id: z
    .string()
    .max(ADDRESS_MAX_LENGTH, {
      message: `Your address may not exceed ${ADDRESS_MAX_LENGTH} characters.'`,
    })
    .min(ADDRESS_MIN_LENGTH, { message: `This field is required` }),
});
