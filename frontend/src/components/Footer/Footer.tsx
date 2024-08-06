import { Box, Flex, Separator, Text } from '@radix-ui/themes';
import React, { memo } from 'react';
import PeopleCard from '../PeopleCard/PeopleCard';

const Footer = () => {
  return (
    <Box style={{ background: '#0B0B0B', borderRadius: '10px' }} p="4">
      <Flex align="center" justify="between">
        <Flex align="center">
          <Text weight="bold" size="2">
            TIG Explorer
          </Text>
          <Separator orientation="vertical" size="2" mx="3" />
          <Text weight="regular" size="2">
            © 2024 Tig Explorer. All rights reserved.
          </Text>
        </Flex>
        <Flex align="center">
          <Text size="2" weight="regular">
            Developped by
          </Text>
          <Separator orientation="vertical" size="2" mx="3" />
          <Flex gap="5">
            <PeopleCard
              name="ByFish"
              src={'/assets/images/ByFish.png'}
              link={{
                twitter: 'https://twitter.com/ByFishh',
                github: 'https://github.com/ByFishh',
                support: '0xf859de92a63070c54d05e33a4e99d707a34fdb12',
              }}
            />
            <PeopleCard
              name="R0BIN0"
              src={'/assets/images/ROBINO.png'}
              link={{
                github: 'https://github.com/R0BIN0',
                support: '0x9E15688dFF888A88B35bF602C12ece0275065159',
              }}
            />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default memo(Footer, () => true);
