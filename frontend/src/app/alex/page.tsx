'use client';

import { Box, Flex, Spinner } from '@radix-ui/themes';
import { usePage } from '@/app/alex/page.logic';

export default function Page() {
  const logic = usePage();

  if (!logic.nodes.length)
    return (
      <Flex align="center" justify="center" style={{ height: '100vh' }}>
        <Spinner />
      </Flex>
    );

  return (
    <Box py="8">
      <p>
        Total wallets earn:{' '}
        {logic.nodes
          .reduce(
            (previousValue, currentValue) =>
              previousValue + currentValue.total_earned.reward,
            0,
          )
          .toFixed(2)}{' '}
        TIG
      </p>
      {logic.nodes.map((node) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          key={node.last_rewards.address}
        >
          <p>{node.last_rewards.address}</p>
          <p>
            Last reward: {node.last_rewards.reward.hourly.current.toFixed(2)}{' '}
            TIG/h
          </p>
          <p>Total earned: {node.total_earned.reward.toFixed(2)} TIG</p>
        </div>
      ))}
    </Box>
  );
}
