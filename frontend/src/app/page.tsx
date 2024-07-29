import Card from '@/components/Card/Card';
import { IUnit } from '@/types/IUnit/IUnit';
import { Box, Button, Flex, Heading, Inset, Text } from '@radix-ui/themes';

import Image from 'next/image';

export default function Home() {
  return (
    <main>
      <Flex direction="column" gap="2">
        <Card
          title="Wallet Balance"
          description="Review here global information about your node"
          data={[
            { title: 'Wallet balance', value: 170.3, unit: IUnit.TIG },
            {
              title: 'Wallet balance',
              value: 193.23,
              unit: IUnit.DOLLARD,
              percentage: -22.3,
            },
            { title: 'Wallet balance', value: 170.3, unit: IUnit.TIG },
            {
              title: 'Wallet balance',
              value: 193.23,
              unit: IUnit.DOLLARD,
              percentage: -22.3,
            },
          ]}
        />

        <Card
          title="Earned TIG"
          description="blabla"
          data={[
            {
              title: 'Tig earned last hour',
              value: 103,
              unit: IUnit.DOLLARD,
              percentage: 22.4,
            },
            {
              title: 'Tig earned last hour',
              value: 103,
              unit: IUnit.DOLLARD,
              percentage: 22.4,
            },
          ]}
        />
      </Flex>
    </main>
  );
}
