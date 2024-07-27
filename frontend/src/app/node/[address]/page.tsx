'use client';

import { usePageLogic } from '@/app/node/[address]/page.logic';

export default function Page({ params }: { params: { address: string } }) {
  const logic = usePageLogic(params.address);
  return (
    <>
      <p>Address: {logic.address}</p>
      <p>
        Wallet balance: {logic.walletBalanceSWR.data} TIG (balance in your base
        wallet)
      </p>
      <p>
        Round balance: {logic.roundBalancesSWR.data} TIG (balance in the current
        round)
      </p>
      <p>{logic.lastRewardsSWR.data?.last_hour} / hour (last 1 hour)</p>
      <p>{logic.lastRewardsSWR.data?.last_day} / day (last 1 day)</p>
    </>
  );
}
