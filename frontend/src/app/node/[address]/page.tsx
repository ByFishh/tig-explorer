'use client';

import { usePageLogic } from '@/app/node/[address]/page.logic';
import { BarChart } from '@mui/x-charts';

export default function Page({ params }: { params: { address: string } }) {
  const logic = usePageLogic(params.address);

  return (
    <>
      <p>Address: {logic.address}</p>
      <p>
        Wallet balance: {logic.walletBalanceSWR.data?.balance} TIG (balance in
        your base wallet)
      </p>
      <p>
        Round rewards: {logic.roundRewardsSWR.data?.reward} TIG (reward from the
        last round)
      </p>
      <p>
        Total earned: {logic.totalEarnedSWR.data?.reward} TIG (total reward
        earned)
      </p>
      <p>{logic.lastRewardsSWR.data?.reward.hourly} / hour (last 1 hour)</p>
      <p>{logic.lastRewardsSWR.data?.reward.daily} / day (last 1 day)</p>
      <p>{logic.lastRewardsSWR.data?.reward.weekly} / week (last 1 week)</p>
      <BarChart
        xAxis={[
          {
            scaleType: 'band',
            data:
              logic.blockRewardsSWR.data?.map((block) => block.height) || [],
          },
        ]}
        series={[
          {
            data:
              logic.blockRewardsSWR.data?.map((block) => block.reward) || [],
          },
        ]}
        width={1000}
        height={300}
        barLabel="value"
      />
    </>
  );
}
