'use client';

import { usePageLogic } from '@/app/node/[address]/page.logic';
import Card from '@/components/Card/Card';
import ChartContainer from '@/components/ChartContainer/ChartContainer';
import Configure from '@/components/Configure/Configure';
import { IChartType } from '@/types/IChartType.ts/IChartType';
import { IUnit } from '@/types/IUnit/IUnit';
import { Badge, Box, Container, Flex, Grid, Section } from '@radix-ui/themes';

export default function Page({ params }: { params: { address: string } }) {
  const logic = usePageLogic(params.address);

  const items = [
    {
      title: 'Wallet Balance',
      description: 'Review here global information about your node',
      data: [
        {
          title: 'Wallet balance',
          value: 170.3,
          unit: IUnit.TIG,
        },
        {
          title: 'Wallet balance',
          value: 193.23,
          unit: IUnit.DOLLARD,
        },
      ],
    },
    {
      title: 'Total earned',
      description: 'Review here global information about your node',
      data: [
        {
          title: 'Total earned',
          value: 855.3,
          unit: IUnit.TIG,
        },
        {
          title: 'Total earned',
          value: 1023.62,
          unit: IUnit.DOLLARD,
        },
      ],
    },
    {
      title: 'Current round',
      description: 'Review here global information about your node',
      data: [
        {
          title: 'Current round reward',
          value: 85.3,
          unit: IUnit.TIG,
        },
        {
          title: 'Current round reward',
          value: 102.62,
          unit: IUnit.DOLLARD,
        },
      ],
    },
    {
      title: 'Average',
      description: 'Review here global information about your node',
      data: [
        {
          title: 'Cost',
          value: 0.3,
          unit: IUnit.TIG,
        },
        {
          title: 'Average earned',
          value: 0.24,
          unit: IUnit.TIG_PER_HOUR,
        },
      ],
    },
  ];

  return (
    <Box py="8">
      <Section size="2">
        <Flex mb="4">
          <Badge size="3" color="indigo" radius="full">
            {logic.address}
          </Badge>
        </Flex>
        <Grid columns={{ sm: '2' }} gap="4" width="auto">
          <Flex gap="4" wrap={'wrap'} style={{ flexFlow: 'column' }}>
            {items.map((i) => (
              <Card key={i.title} {...i} />
            ))}
          </Flex>
          <Flex gap="4" wrap={'wrap'} style={{ flexFlow: 'column' }}>
            <Card
              title="Last TIG earned"
              description="Review here global information about your node"
              data={[
                {
                  title: 'Tig earned last hour',
                  value: 10.3,
                  unit: IUnit.TIG,
                  percentage: 22.3,
                },
                {
                  title: 'Tig earned last hour',
                  value: 12.62,
                  unit: IUnit.DOLLARD,
                  percentage: 22.3,
                },
                {
                  title: 'Tig earned last day',
                  value: 17.3,
                  unit: IUnit.TIG,
                  percentage: -22.3,
                },
                {
                  title: 'Tig earned last day',
                  value: 102.62,
                  unit: IUnit.DOLLARD,
                  percentage: -2.3,
                },
                {
                  title: 'Tig earned last week',
                  value: 130.3,
                  unit: IUnit.TIG,
                },
                {
                  title: 'Tig earned last week',
                  value: 823.62,
                  unit: IUnit.DOLLARD,
                },
              ]}
            />
            <Configure />
          </Flex>
        </Grid>
        <Container mt="4">
          <Flex gap="4" style={{ flexFlow: 'column' }}>
            <ChartContainer
              title="Qualifier"
              description="Review here global information about your node"
              type={IChartType.LINE}
            />

            <ChartContainer
              title="Earned TIG"
              description="Review here global information about your node"
              type={IChartType.BAR}
            />

            <ChartContainer
              title="Earned TIG"
              description="Review here global information about your node"
              type={IChartType.BAR}
            />
          </Flex>
        </Container>
      </Section>
    </Box>
  );
}
