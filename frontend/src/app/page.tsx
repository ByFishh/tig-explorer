'use client';
import Card from '@/components/Card/Card';
import { ICard } from '@/types/ICard/ICard';
import { IUnit } from '@/types/IUnit/IUnit';
import { convertUnit } from '@/utils/convertUnit';
import {
  Button,
  Flex,
  Grid,
  Heading,
  Section,
  Table,
  Text,
  TextField,
} from '@radix-ui/themes';
import { v4 as uuidv4 } from 'uuid';
import { usePage } from './page.logic';
import { Controller } from 'react-hook-form';
import { PlusIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export default function Home() {
  const logic = usePage();
  const items: ICard[] = [
    {
      title: 'Total earned',
      description: 'Review here the total earned by your node',
      data: [
        {
          title: 'Total earned',
          value: logic.getTotalEarned,
          unit: IUnit.TIG,
        },
        {
          title: 'Total earned',
          value: convertUnit(logic.getTotalEarned, logic.tigPrice),
          unit: IUnit.DOLLARD,
        },
      ],
    },

    {
      title: 'Average rewards',
      description: 'Review here the average rewards',
      data: [],
      content: (
        <>
          <Flex pr="2">
            {logic.allNodesAreConfigured ? (
              <Flex style={{ flexFlow: 'column' }}>
                <Text as="p" size="2" mb="0" color="gray">
                  Cost per {IUnit.TIG} ({IUnit.DOLLARD})
                </Text>
                <Text as="p" size="7" weight="medium">
                  <span style={{ fontSize: '.825rem' }}>{IUnit.DOLLARD}</span>
                  {logic
                    .getCostPerTig(
                      logic.getAllServerCost,
                      logic.getAverageEarned,
                    )
                    .toFixed(2)}
                </Text>
              </Flex>
            ) : (
              <Text size="2" color="red">
                You need to enter a server cost on ALL your nodes before you can
                access this data.
              </Text>
            )}
          </Flex>
          <Flex style={{ flexFlow: 'column' }}>
            <Text as="p" size="2" mb="0" color="gray">
              Average earned ({IUnit.TIG_PER_HOUR})
            </Text>
            <Text as="p" size="7" weight="medium">
              {Number(logic.getAverageEarned).toFixed(2)}
              <span style={{ fontSize: '.825rem' }}>{IUnit.TIG_PER_HOUR}</span>
            </Text>
          </Flex>
        </>
      ),
    },
  ];

  const headers: { txt: string; unit?: IUnit }[] = [
    {
      txt: 'Address',
    },
    {
      txt: 'Total earned',
      unit: IUnit.TIG,
    },
    {
      txt: 'Average earned',
      unit: IUnit.TIG_PER_HOUR,
    },
    {
      txt: 'Cost per TIG',
      unit: IUnit.DOLLARD,
    },
    {
      txt: 'Server cost',
      unit: IUnit.DOLLARD_PER_MONTH,
    },
    {
      txt: 'Core number',
    },
    {
      txt: 'Start date',
    },
    {
      txt: 'Notes',
    },
  ];

  return (
    <Section>
      <Flex direction="column" gap="2">
        <Heading as="h1" size="8" weight="medium">
          Overview
        </Heading>
        <Flex direction="column">
          <Flex py="4" mt="4">
            <Heading as="h2" weight="medium">
              Total
            </Heading>
          </Flex>
          <Grid gap="4" columns={{ sm: '2' }}>
            {items.map((i) => (
              <Card key={uuidv4()} {...i} />
            ))}
          </Grid>
          <Flex py="4" mt="6">
            <Heading as="h2" weight="medium">
              Nodes
            </Heading>
          </Flex>
          <Flex gap="4">
            <Controller
              name="search"
              control={logic.control}
              render={({ field }) => (
                <TextField.Root
                  style={{ width: '100%' }}
                  size="3"
                  type="text"
                  onChange={field.onChange}
                  defaultValue={''}
                  disabled
                ></TextField.Root>
              )}
            ></Controller>
            <Button size="3" onClick={logic.openNodeDialog}>
              <PlusIcon /> Add node
            </Button>
          </Flex>
          <Flex direction="column" py="4" my="6">
            <Flex justify="end">
              <Text size="3">
                Loaded nodes {logic.tableData.length}/{logic.nodes?.length ?? 0}
              </Text>
            </Flex>
            <Flex my="4">
              <Table.Root size="3" style={{ width: '100%' }} variant="surface">
                <Table.Header>
                  <Table.Row>
                    {headers.map((h) => (
                      <Table.ColumnHeaderCell key={uuidv4()}>
                        <Text size="2">
                          {h.txt}{' '}
                          {h.unit && (
                            <span style={{ fontSize: '.725rem' }}>
                              ({h.unit})
                            </span>
                          )}
                        </Text>
                      </Table.ColumnHeaderCell>
                    ))}
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {logic.tableData.map((td) => (
                    <Table.Row key={uuidv4()}>
                      <Table.RowHeaderCell>
                        <Link
                          style={{ color: 'white' }}
                          href={`/node/${td.id}`}
                        >
                          {td.id}
                        </Link>
                      </Table.RowHeaderCell>
                      <Table.Cell>
                        {Number(td.total_earned.reward).toFixed(2)}
                      </Table.Cell>
                      <Table.Cell>
                        {Number(td.average_rewards.reward).toFixed(2)}
                      </Table.Cell>
                      <Table.Cell>
                        {logic
                          .getCostPerTig(
                            td.serverCost,
                            td.average_rewards.reward,
                          )
                          .toFixed(2)}
                      </Table.Cell>
                      <Table.Cell>
                        {Number(td.serverCost).toFixed(2)}
                      </Table.Cell>
                      <Table.Cell>{Number(td.coreNumber)}</Table.Cell>
                      <Table.Cell>{String(td.startDate)}</Table.Cell>
                      <Table.Cell>{String(td.notes)}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Section>
  );
}
