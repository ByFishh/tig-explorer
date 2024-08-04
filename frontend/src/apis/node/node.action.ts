import { BASE_API_URL } from '@/const/const';
import { addressSchema } from '@/schemas/Address.schema';
import { averageRewardsSchema } from '@/schemas/AverageRewards';
import { baseNodeSchema } from '@/schemas/BaseNode.schema';
import { totalEarnedSchema } from '@/schemas/TotalEarned.schema';
import { tryCatchAsync } from '@/utils/tryCatchAsync';
import axios from 'axios';
import { z } from 'zod';

const _getNodeBase = z
  .function()
  .args(addressSchema.shape.id)
  .returns(z.promise(baseNodeSchema))
  .implement(async (params) => {
    const res = await axios.get(`${BASE_API_URL}/nodes/${params}`);
    return res.data.node;
  });

const _getNodePreview = z
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
    const res = await axios.get(`${BASE_API_URL}/nodes/${params}/preview`);
    return res.data.node;
  });

export const getNodeBase = tryCatchAsync(_getNodeBase);
export const getNodePreview = tryCatchAsync(_getNodePreview);
