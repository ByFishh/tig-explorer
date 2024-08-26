'use client';

import { usePage } from '@/app/benchmarker/[address]/page.logic';
import Card from '@/components/Card/Card';
import ChartContainer from '@/components/ChartContainer/ChartContainer';
import Configure from '@/components/Configure/Configure';
import { IChartType } from '@/types/IChartType.ts/IChartType';
import { IUnit } from '@/types/IUnit/IUnit';
import { convertUnit } from '@/utils/convertUnit';
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
      description: 'Review here your benchmarker wallet balance',
      forceRender: true,
      data: [
        {
          title: 'Wallet balance',
          value: logic.benchmarker?.wallet_balance ?? null,
          unit: IUnit.TIG,
        },
        {
          title: 'Wallet balance',
          value: convertUnit(
            logic.benchmarker?.wallet_balance ?? 0,
            logic.tigPrice,
          ),
          unit: IUnit.DOLLARD,
        },
      ],
    },
    {
      title: 'Total earned',
      description: 'Review here the total earned by your benchmarker',
      forceRender: true,
      data: [
        {
          title: 'Total earned',
          value: logic.benchmarker?.total_earned ?? null,
          unit: IUnit.TIG,
        },
        {
          title: 'Total earned',
          value: convertUnit(
            logic.benchmarker?.total_earned ?? 0,
            logic.tigPrice,
          ),
          unit: IUnit.DOLLARD,
        },
      ],
    },
    {
      title: 'Current round',
      description: 'Review here the current round rewards',
      forceRender: true,
      close: (
        <Text size="6" weight="medium">
          {logic.benchmarker?.round ?? 'Error'}
        </Text>
      ),
      data: [
        {
          title: 'Current round rewards',
          value: logic.benchmarker?.round_rewards ?? null,
          unit: IUnit.TIG,
        },
        {
          title: 'Current round rewards',
          value: convertUnit(
            logic.benchmarker?.round_rewards ?? 0,
            logic.tigPrice,
          ),
          unit: IUnit.DOLLARD,
        },
      ],
    },
    {
      title: 'Average rewards',
      description: 'Review here the average rewards',
      data: [],
      forceRender: true,
      content: (
        <>
          <Flex pr="2">
            {logic.benchmarkerIsConfigured() ? (
              <Flex style={{ flexFlow: 'column' }}>
                <Text as="p" size="2" mb="0" color="gray">
                  Cost per {IUnit.TIG} (Last 2h) ({IUnit.DOLLARD})
                </Text>
                <Text as="p" size="7" weight="medium">
                  <span style={{ fontSize: '.825rem' }}>{IUnit.DOLLARD}</span>
                  {logic.getCostPerTig().toFixed(2)}
                </Text>
              </Flex>
            ) : (
              <Text size="2" color="red">
                You must enter a server cost in the{' '}
                <span style={{ textDecoration: 'underline' }}>
                  Configure benchmarker
                </span>{' '}
                before you can access this data.
              </Text>
            )}
          </Flex>
          <Flex style={{ flexFlow: 'column' }}>
            <Text as="p" size="2" mb="0" color="gray">
              Average earned (Last 2h) ({IUnit.TIG_PER_HOUR})
            </Text>
            <Text as="p" size="7" weight="medium">
              {Number(logic.benchmarker?.average_rewards).toFixed(2)}
              <span style={{ fontSize: '.825rem' }}>{IUnit.TIG_PER_HOUR}</span>
            </Text>
          </Flex>

          <Flex pr="2">
            {!!logic.benchmarkerHasStartDate() &&
            !!logic.benchmarkerIsConfigured() ? (
              <Flex style={{ flexFlow: 'column' }}>
                <Text as="p" size="2" mb="0" color="gray">
                  Cost per {IUnit.TIG} (Since start) ({IUnit.DOLLARD})
                </Text>
                <Text as="p" size="7" weight="medium">
                  <span style={{ fontSize: '.825rem' }}>{IUnit.DOLLARD}</span>
                  {logic.getCostSinceStart()?.toFixed(2)}
                </Text>
              </Flex>
            ) : (
              <Text size="2" color="red">
                You must enter a server cost and a start date in the{' '}
                <span style={{ textDecoration: 'underline' }}>
                  Configure benchmarker
                </span>{' '}
                before you can access this data.
              </Text>
            )}
          </Flex>

          <Flex pr="2">
            {!!logic.benchmarkerHasStartDate() ? (
              <Flex style={{ flexFlow: 'column' }}>
                <Text as="p" size="2" mb="0" color="gray">
                  Average earned (Since start) ({IUnit.TIG_PER_HOUR})
                </Text>
                <Text as="p" size="7" weight="medium">
                  {logic.getAverageTigSinceStart()?.toFixed(2)}
                  <span style={{ fontSize: '.825rem' }}>
                    {IUnit.TIG_PER_HOUR}
                  </span>
                </Text>
              </Flex>
            ) : (
              <Text size="2" color="red">
                You must enter a start date in the{' '}
                <span style={{ textDecoration: 'underline' }}>
                  Configure benchmarker
                </span>{' '}
                before you can access this data.
              </Text>
            )}
          </Flex>
        </>
      ),
    },
  ];

  if (!logic.benchmarker)
    return (
      <Flex align="center" justify="center" style={{ height: '100vh' }}>
        <Spinner />
      </Flex>
    );

  return (
    <Box py="8">
      <Section size="2">
        <Flex mb="4">
          <Badge
            size="3"
            color="indigo"
            radius="full"
            style={{ padding: '.5rem 1rem' }}
          >
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
              description="Review here the last TIG earned by your benchmarker"
              forceRender={true}
              data={[
                {
                  title: 'Tig earned last hour',
                  value: logic.benchmarker.last_rewards.hourly.current,
                  unit: IUnit.TIG,
                  percentage: logic.benchmarker.last_rewards.hourly.change,
                },
                {
                  title: 'Tig earned last hour',
                  value: convertUnit(
                    logic.benchmarker.last_rewards.hourly.current ?? 0,
                    logic.tigPrice,
                  ),
                  unit: IUnit.DOLLARD,
                  percentage: logic.benchmarker.last_rewards.hourly.change,
                },
                {
                  title: 'Tig earned last day',
                  value: logic.benchmarker.last_rewards.daily.current,
                  unit: IUnit.TIG,
                  percentage: logic.benchmarker.last_rewards.daily.change,
                },
                {
                  title: 'Tig earned last day',
                  value: convertUnit(
                    logic.benchmarker.last_rewards.daily.current ?? 0,
                    logic.tigPrice,
                  ),
                  unit: IUnit.DOLLARD,
                  percentage: logic.benchmarker.last_rewards.daily.change,
                },
                {
                  title: 'Tig earned last week',
                  value: logic.benchmarker.last_rewards.weekly.current,
                  unit: IUnit.TIG,
                },
                {
                  title: 'Tig earned last week',
                  value: convertUnit(
                    logic.benchmarker.last_rewards.weekly.current ?? 0,
                    logic.tigPrice,
                  ),
                  unit: IUnit.DOLLARD,
                },
              ]}
            />
            <Configure invokeCardRender={logic.renderCards} />
          </Flex>
        </Grid>
        <Container mt="4">
          <Flex gap="4" style={{ flexFlow: 'column' }}>
            <ChartContainer
              title="Qualifiers"
              description="The number of qualifiers during the last 120 blocks (2 hours)"
              type={IChartType.LINE}
              data={{
                labels: logic.benchmarker.block_rewards.map((b) =>
                  String(b.height),
                ),
                datasets: [
                  {
                    label: 'c001',
                    data: logic.benchmarker.block_rewards.map((b) => b.c001),
                    borderWidth: 1,
                    borderColor: '#0DFFE0',
                    fill: true,
                  },
                  {
                    label: 'c002',
                    data: logic.benchmarker.block_rewards.map((b) => b.c002),
                    borderWidth: 1,
                    borderColor: '#0096FF',
                    fill: true,
                  },
                  {
                    label: 'c003',
                    data: logic.benchmarker.block_rewards.map((b) => b.c003),
                    borderWidth: 1,
                    borderColor: '#FF9592',
                    fill: true,
                  },
                  {
                    label: 'c004',
                    data: logic.benchmarker.block_rewards.map((b) => b.c004),
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
                labels: logic.benchmarker.block_rewards.map((b) =>
                  String(b.height),
                ),
                datasets: [
                  {
                    label: 'Reward by block',
                    data: logic.benchmarker.block_rewards.map((b) => b.reward),
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
