'use client';

import { usePage } from '@/app/node/[address]/page.logic';
import Card from '@/components/Card/Card';
import ChartContainer from '@/components/ChartContainer/ChartContainer';
import Configure from '@/components/Configure/Configure';
import { IChartType } from '@/types/IChartType.ts/IChartType';
import { IUnit } from '@/types/IUnit/IUnit';
import {
  Badge,
  Box,
  Container,
  Flex,
  Grid,
  Section,
  Spinner,
  Text,
} from '@radix-ui/themes';

export default function Page({ params }: { params: { address: string } }) {
  const logic = usePage(params.address);

  const items = [
    {
      title: 'Wallet Balance',
      description: 'Review here your node wallet balance',
      data: [
        {
          title: 'Wallet balance',
          value: logic.node?.walletBalance.balance,
          unit: IUnit.TIG,
        },
        {
          title: 'Wallet balance',
          value: 0,
          unit: IUnit.DOLLARD,
        },
      ],
    },
    {
      title: 'Total earned',
      description: 'Review here the total earned by your node',
      data: [
        {
          title: 'Total earned',
          value: logic.node?.totalEarned.reward,
          unit: IUnit.TIG,
        },
        {
          title: 'Total earned',
          value: 0,
          unit: IUnit.DOLLARD,
        },
      ],
    },
    {
      title: 'Current round',
      description: 'Review here the current round rewards',
      data: [
        {
          title: 'Current round rewards',
          value: logic.node?.roundRewards.reward,
          unit: IUnit.TIG,
        },
        {
          title: 'Current round rewards',
          value: 0,
          unit: IUnit.DOLLARD,
        },
      ],
    },
    {
      title: 'Average rewards',
      description: 'Review here the average rewards',
      data: [],
      content: (
        <Text size="2" color="red">
          You must enter a server cost in the{' '}
          <span style={{ textDecoration: 'underline' }}>Configure Node</span>{' '}
          before you can access this data.
        </Text>
      ),
    },
  ];

  if (!logic.node)
    return (
      <Flex align="center" justify="center" style={{ height: '100vh' }}>
        <Spinner />
      </Flex>
    );

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
              description="Review here the last TIG earned by your node"
              data={[
                {
                  title: 'Tig earned last hour',
                  value: logic.node.lastRewards.reward.hourly.current,
                  unit: IUnit.TIG,
                  percentage: logic.node.lastRewards.reward.hourly.change,
                },
                {
                  title: 'Tig earned last hour',
                  value: 0,
                  unit: IUnit.DOLLARD,
                },
                {
                  title: 'Tig earned last day',
                  value: logic.node.lastRewards.reward.daily.current,
                  unit: IUnit.TIG,
                  percentage: logic.node.lastRewards.reward.daily.change,
                },
                {
                  title: 'Tig earned last day',
                  value: 0,
                  unit: IUnit.DOLLARD,
                },
                {
                  title: 'Tig earned last week',
                  value: logic.node.lastRewards.reward.weekly.current,
                  unit: IUnit.TIG,
                },
                {
                  title: 'Tig earned last week',
                  value: 0,
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
              title="Qualifiers"
              description="The numlber of qualifiers during the last 120 blocks (2 hours)"
              type={IChartType.LINE}
              data={{
                labels: logic.node.blockRewards.blocks.map((b) =>
                  String(b.height),
                ),
                datasets: [
                  {
                    label: 'c001',
                    data: logic.node.blockRewards.blocks.map((b) => b.c001),
                    borderWidth: 1,
                    borderColor: '#0DFFE0',
                    fill: true,
                  },
                  {
                    label: 'c002',
                    data: logic.node.blockRewards.blocks.map((b) => b.c002),
                    borderWidth: 1,
                    borderColor: '#0096FF',
                    fill: true,
                  },
                  {
                    label: 'c003',
                    data: logic.node.blockRewards.blocks.map((b) => b.c003),
                    borderWidth: 1,
                    borderColor: '#FF9592',
                    fill: true,
                  },
                ],
              }}
            />

            <ChartContainer
              title="Earned TIG"
              description="The number of TIG earned during the last 120 blocks (2 hours)"
              type={IChartType.BAR}
              data={{
                labels: logic.node.blockRewards.blocks.map((b) =>
                  String(b.height),
                ),
                datasets: [
                  {
                    label: 'Reward by block',
                    data: logic.node.blockRewards.blocks.map((b) => b.reward),
                    borderRadius: 2,
                    borderWidth: 1,
                    borderColor: '#3D63DD',
                  },
                ],
              }}
            />
          </Flex>
        </Container>
      </Section>
    </Box>
  );
}
