import { Flex } from '@radix-ui/themes';
import React from 'react';
import OverviewCards from '../OverviewCards/OverviewCards';
import ValidBenchmarkers from '../ValidBenchmarkers/ValidBenchmarkers';
import InvalidBenchmarkers from '../InvalidBenchmarkers/InvalidBenchmarkers';
import { useBenchmarkersContainer } from './BenchmarkersContainer.logic';
import { IBenchmarkersContainer } from '@/types/IBenchmarkersContainer/IBenchmarkersContainer';

const BenchmarkersContainer = (props: IBenchmarkersContainer) => {
  useBenchmarkersContainer(props);
  return (
    <Flex direction="column">
      <OverviewCards />
      <ValidBenchmarkers />
      <InvalidBenchmarkers />
    </Flex>
  );
};

export default BenchmarkersContainer;
