import { Flex } from '@radix-ui/themes';
import React from 'react';
import OverviewCards from '../OverviewCards/OverviewCards';
import ValidNodes from '../ValidNodes/ValidNodes';
import InvalidNodes from '../InvalidNodes/InvalidNodes';
import { useNodesContainer } from './NodesContainer.logic';
import { INodesContainer } from '@/types/INodesContainer/INodesContainer';

const NodesContainer = (props: INodesContainer) => {
  useNodesContainer(props);
  return (
    <Flex direction="column">
      <OverviewCards />
      <ValidNodes />
      <InvalidNodes />
    </Flex>
  );
};

export default NodesContainer;
