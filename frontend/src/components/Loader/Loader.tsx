import { ILoader } from '@/types/ILoader/ILoader';
import React from 'react';
import { useLoader } from './Loader.logic';
import { Flex, Spinner } from '@radix-ui/themes';

const Loader = (props: ILoader) => {
  useLoader(props);
  return (
    <Flex
      width="100%"
      align="center"
      justify="center"
      height="100vh"
      style={{
        position: 'absolute',
        top: '0',
        left: '0',
        zIndex: 1000,
        background: '#111111',
      }}
    >
      <Spinner />
    </Flex>
  );
};

export default Loader;
