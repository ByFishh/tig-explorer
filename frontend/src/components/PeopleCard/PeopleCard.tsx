import { IPeopleCard } from '@/types/IPeopleCard/IPeopleCard';
import { displayAddress } from '@/utils/displayAddress';
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons';
import { Avatar, Flex, Text } from '@radix-ui/themes';
import React, { memo } from 'react';
import { v4 as uuidv4 } from 'uuid';

const PeopleCard = (props: IPeopleCard) => {
  const links = [
    {
      link: props.link.github,
      icon: <GitHubLogoIcon width="13" height="13" />,
    },
    {
      link: props.link.twitter,
      icon: <TwitterLogoIcon width="13" height="13" />,
    },
    {
      link: props.link.linkedin,
      icon: <LinkedInLogoIcon width="13" height="13" />,
    },
  ];

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
              {links.map((item) => {
                if (!item.link) return <div key={uuidv4()}></div>;
                return (
                  <a
                    key={uuidv4()}
                    href={item.link}
                    target="_blank"
                    style={{
                      color: '#A7A7A7',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {item.icon}
                  </a>
                );
              })}
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
