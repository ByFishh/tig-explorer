import { ICard } from '@/types/ICard/ICard';
import { Box, Text, Card as RadixCard, Flex, Badge } from '@radix-ui/themes';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useCard } from './Card.logic';

const Card = (props: ICard) => {
  const logic = useCard();
  return (
    <Box width="100%" style={{ height: '100%' }}>
      <RadixCard size="4" style={{ height: '100%' }}>
        <Flex gap="3" align="center" mb="7">
          <Box>
            <Text as="p" size="6" weight="medium" mb="1">
              {props.title}
            </Text>
            <Text as="p" size="2" color="gray">
              {props.description}
            </Text>
          </Box>
        </Flex>
        <Flex
          align={'center'}
          justify={'start'}
          gapX={'8'}
          gapY={'6'}
          wrap={'wrap'}
        >
          {props.data.map((d) => (
            <Flex key={uuidv4()} style={{ flexFlow: 'column' }}>
              <Text as="p" size="2" mb="0" color="gray">
                {d.title} ({d.unit}){' '}
                {d.percentage && (
                  <Badge
                    color={d.percentage > 0 ? 'jade' : 'ruby'}
                    radius="full"
                  >
                    {d.percentage > 0 && '+'}
                    {d.percentage}%
                  </Badge>
                )}
              </Text>
              {logic.getValue(d.value, d.unit)}
            </Flex>
          ))}
        </Flex>
      </RadixCard>
    </Box>
  );
};

export default Card;
