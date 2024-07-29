import Card from '@/components/Card/Card';
import Configure from '@/components/Configure/Configure';
import { IUnit } from '@/types/IUnit/IUnit';
import { Box, Button, Flex, Heading, Inset, Text } from '@radix-ui/themes';

import Image from 'next/image';

export default function Home() {
  return (
    <main>
      <Flex direction="column" gap="2">
        <Configure />
      </Flex>
    </main>
  );
}
