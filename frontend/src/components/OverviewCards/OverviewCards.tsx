import React from 'react';
import { useOverviewCards } from './OverviewCards.logic';
import { Flex, Grid, Heading } from '@radix-ui/themes';
import { v4 as uuidv4 } from 'uuid';
import Card from '../Card/Card';

const OverviewCards = () => {
  const logic = useOverviewCards();
  return (
    <>
      {!!logic.getBenchmarkers.valid.length && (
        <>
          <Flex py="4" mt="4">
            <Heading as="h2" weight="medium">
              Total
            </Heading>
          </Flex>
          <Grid gap="4" columns={{ sm: '2' }}>
            {logic.items.map((i) => (
              <Card key={uuidv4()} {...i} />
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default OverviewCards;
