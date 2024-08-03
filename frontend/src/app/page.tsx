'use client';
import Card from '@/components/Card/Card';
import { ICard } from '@/types/ICard/ICard';
import { IUnit } from '@/types/IUnit/IUnit';
import { convertUnit } from '@/utils/convertUnit';
import {
  Button,
  Callout,
  Checkbox,
  Flex,
  Grid,
  Heading,
  Section,
  Spinner,
  Table,
  Text,
  TextField,
} from '@radix-ui/themes';
import { v4 as uuidv4 } from 'uuid';
import { usePage } from './page.logic';
import { Controller } from 'react-hook-form';
import {
  CircleBackslashIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from '@radix-ui/react-icons';
import Link from 'next/link';
import Address from '@/components/Address/Address';
import Menu from '@/components/Menu/Menu';

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

  const tableHeaders: { txt: string; unit?: IUnit }[] = [
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
    {
      txt: '',
    },
  ];

  if (logic.isLoading)
    return (
      <Flex width="100%" p="6" align="center" justify="center" height="100vh">
        <Spinner />
      </Flex>
    );

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
          {logic.anyNode && (
            <Flex gap="4">
              <form
                onSubmit={logic.handleSubmit(logic.onSubmit)}
                style={{ width: '100%' }}
              >
                <Controller
                  name="search"
                  control={logic.control}
                  render={({ field }) => (
                    <TextField.Root
                      style={{ width: '100%', minHeight: '35px' }}
                      size="2"
                      type="text"
                      onChange={field.onChange}
                      defaultValue={''}
                    >
                      <TextField.Slot>
                        <MagnifyingGlassIcon height="16" width="16" />
                      </TextField.Slot>
                    </TextField.Root>
                  )}
                ></Controller>
              </form>

              <Button
                size="2"
                onClick={logic.openNodeDialog}
                style={{ minHeight: '35px' }}
              >
                <PlusIcon /> Add node
              </Button>
            </Flex>
          )}

          <Flex direction="column" py="4" my="6">
            {!!logic.getTableData.length && (
              <Flex justify="end">
                <Text size="3">
                  Total loaded nodes {logic.tableData.length}/
                  {Number(logic.nodes?.length - logic.invalidNodes.length) ?? 0}
                </Text>
              </Flex>
            )}
            <Flex my="4">
              {!!logic.getTableData.length ? (
                <Table.Root
                  size="3"
                  style={{ width: '100%' }}
                  variant="surface"
                >
                  <Table.Header>
                    <Table.Row>
                      {tableHeaders.map((h) => (
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
                    {logic.getTableData.map((td) => (
                      <Table.Row key={uuidv4()}>
                        <Table.RowHeaderCell>
                          <a
                            target="_blank"
                            href={`https://tig-explorer.com/node/${td.id}`}
                            rel="noopener noreferrer"
                            style={{ color: 'white' }}
                          >
                            <Address address={td.id} />
                          </a>
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
                        <Table.Cell>
                          <Menu address={td.id} />
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              ) : (
                <Flex align="center" justify="center" width="100%">
                  {logic.keyword ? (
                    <Text color="red">No node was found with this address</Text>
                  ) : (
                    <Flex direction="column" align="center" gap="4">
                      <Text>
                        you don&apos;t have a node yet, you can create one right
                        here
                      </Text>
                      <Button
                        size="2"
                        onClick={logic.openNodeDialog}
                        style={{ minHeight: '35px', maxWidth: '110px' }}
                      >
                        <PlusIcon /> Add node
                      </Button>
                    </Flex>
                  )}
                </Flex>
              )}
            </Flex>
          </Flex>
          {!!logic.invalidNodes.length && (
            <Flex mt="4" direction="column">
              <Flex direction="column">
                <Flex align="center" justify="between">
                  <Heading as="h2" weight="medium">
                    Invalid nodes
                  </Heading>
                  <Text as="label" size="1" color="gray">
                    <Flex gap="2">
                      <Checkbox
                        checked={logic.showInvalidNodes}
                        onClick={logic.handleShowInvalidNodes}
                      />
                      Show invalid nodes
                    </Flex>
                  </Text>
                </Flex>
              </Flex>

              {logic.showInvalidNodes && (
                <>
                  <Callout.Root mt="4" color="red">
                    <Callout.Icon>
                      <CircleBackslashIcon />
                    </Callout.Icon>
                    <Callout.Text>
                      This is where you&apos;ll find all your invalid nodes.
                      They represent all the nodes that have an invalid address
                      or that have not been correctly loaded by the server. If
                      this is the case, you can contact us here:{' '}
                      <a
                        style={{ textDecoration: 'underline' }}
                        href="https://twitter.com/ByFishh"
                      >
                        https://twitter.com/ByFishh
                      </a>
                    </Callout.Text>
                  </Callout.Root>
                  <Flex my="4">
                    <Table.Root
                      size="3"
                      style={{ width: '100%' }}
                      variant="surface"
                    >
                      <Table.Header>
                        <Table.Row>
                          <Table.ColumnHeaderCell width="100%">
                            <Text size="2">Address</Text>
                          </Table.ColumnHeaderCell>
                          <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                        </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        {logic.invalidNodes.map((td) => (
                          <Table.Row key={uuidv4()}>
                            <Table.RowHeaderCell>{td.id}</Table.RowHeaderCell>
                            <Table.Cell>
                              <Menu address={td.id} disable={{ edit: true }} />
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table.Root>
                  </Flex>
                </>
              )}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Section>
  );
}
