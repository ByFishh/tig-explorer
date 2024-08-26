import { BASE_API_URL } from '@/const/const';
import { addressSchema } from '@/schemas/Address.schema';
import { averageRewardsSchema } from '@/schemas/AverageRewards';
import { baseBenchmarkerSchema } from '@/schemas/BaseBenchmarker.schema';
import { totalEarnedSchema } from '@/schemas/TotalEarned.schema';
import { tryCatchAsync } from '@/utils/tryCatchAsync';
import axios from 'axios';
import { z } from 'zod';

const _getBenchmarkerBase = z
  .function()
  .args(addressSchema.shape.id)
  .returns(z.promise(baseBenchmarkerSchema))
  .implement(async (params) => {
    const res = await axios.get(`${BASE_API_URL}/benchmarker/${params}`);
    return res.data;
  });

const _getBenchmarkerPreview = z
  .function()
  .args(addressSchema.shape.id)
  .returns(
    z.promise(
      z.object({
        total_earned: totalEarnedSchema,
        average_rewards: averageRewardsSchema,
      }),
    ),
  )
  .implement(async (params) => {
    const res = await axios.get(
      `${BASE_API_URL}/benchmarker/${params}/preview`,
    );
    return res.data;
  });

export const getBenchmarkerBase = tryCatchAsync(_getBenchmarkerBase);
export const getBenchmarkerPreview = tryCatchAsync(_getBenchmarkerPreview);
