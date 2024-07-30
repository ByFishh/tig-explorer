'use client';
import ChartContainer from '@/components/ChartContainer/ChartContainer';
import { ILocalStorageKey } from '@/types/ILocalStorageKey/ILocalStorageKey';
import { initializeStorage } from '@/utils/localStorage';
import { Flex } from '@radix-ui/themes';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    initializeStorage({ key: ILocalStorageKey.NODES, defaultValue: [] });
  }, []);

  return (
    <main>
      <Flex direction="column" gap="2"></Flex>
    </main>
  );
}
