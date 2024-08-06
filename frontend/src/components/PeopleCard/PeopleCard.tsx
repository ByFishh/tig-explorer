import { IPeopleCard } from '@/types/IPeopleCard/IPeopleCard';
import { displayAddress } from '@/utils/displayAddress';
import { GitHubLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { Avatar, Flex, Text } from '@radix-ui/themes';
import React, { memo } from 'react';

const PeopleCard = (props: IPeopleCard) => {
  return (
    <Flex gap="2" align="center">
      <Flex>
        <Avatar
          size="1"
          radius="full"
          fallback={''}
          src={props.src}
          alt={props.name}
        />
      </Flex>
      <Flex>
        <Flex direction="column">
          <Flex align="center">
            <Text size="2" weight="medium">
              {props.name}
            </Text>
            <Flex gap="1" ml="2">
              {!!props.link.github && (
                <a
                  href={props.link.github}
                  target="_blank"
                  style={{
                    color: '#A7A7A7',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <GitHubLogoIcon />
                </a>
              )}
              {!!props.link.twitter && (
                <a
                  href={props.link.twitter}
                  target="_blank"
                  style={{
                    color: '#A7A7A7',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <TwitterLogoIcon />
                </a>
              )}
            </Flex>
          </Flex>
          {!!props.link.support && (
            <Text size="1">
              Support me:{' '}
              <a
                style={{ color: 'white' }}
                target="_blank"
                href={`https://debank.com/profile/${props.link.support}`}
              >
                {displayAddress(props.link.support)}
              </a>
            </Text>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default memo(PeopleCard, () => true);
