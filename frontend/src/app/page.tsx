'use client';
import { Flex, Heading, Section } from '@radix-ui/themes';
import { usePage } from './page.logic';
import Loader from '@/components/Loader/Loader';
import BenchmarkersContainer from '@/components/BenchmarkersContainer/BenchmarkersContainer';

export default function Home() {
  const logic = usePage();

  return (
    <>
      {logic.isLoading && (
        <Loader isLoading={logic.isLoading} trigger={logic.triggerLoader} />
      )}
      <Section>
        <Flex direction="column" gap="2">
          <Heading as="h1" size="8" weight="medium">
            Overview
          </Heading>
          <BenchmarkersContainer trigger={logic.triggerLoader} />
        </Flex>
      </Section>
    </>
  );
}
