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
import Address from '@/components/Address/Address';
import Menu from '@/components/Menu/Menu';
import { formatDate } from '@/utils/formatDate';
import ExportNodes from '@/components/ExportNodes/ExportNodes';
import { getCostPerTig } from '@/utils/getCostPerTig';

export default function Home() {
  const logic = usePage();
  const items: ICard[] = [
    {
      title: 'Total earned',
      description: 'Review here the total earned by your node',
      data: [
        {
          title: 'Total earned',
          value: logic.validNodesInformation.totalEarned,
          unit: IUnit.TIG,
        },
        {
          title: 'Total earned',
          value: convertUnit(
            logic.validNodesInformation.totalEarned,
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
      content: (
        <>
          {!!logic.validNodesInformation.allHaveStartDate ? (
            <Flex style={{ flexFlow: 'column' }}>
              <Text as="p" size="2" mb="0" color="gray">
                Average earned since start
              </Text>
              <Text as="p" size="7" weight="medium">
                {Number(
                  logic.validNodesInformation.getTigEanedSinceStart,
                ).toFixed(2)}
                <span style={{ fontSize: '.825rem' }}>
                  {IUnit.TIG_PER_HOUR}
                </span>
              </Text>
            </Flex>
          ) : (
            <Text size="2" color="red">
              You need to enter a{' '}
              <span style={{ textDecoration: 'underline' }}>Start date</span> on
              ALL your valid nodes before you can access this data.
            </Text>
          )}
          {!!logic.validNodesInformation.allHaveStartDate ||
          !!logic.validNodesInformation.allAreConfigured ? (
            <Flex style={{ flexFlow: 'column' }}>
              <Text as="p" size="2" mb="0" color="gray">
                Cost per tig since start
              </Text>
              <Text as="p" size="7" weight="medium">
                {Number(
                  logic.validNodesInformation.costSinceStart /
                    logic.getNodes.valid.length,
                ).toFixed(2)}
                <span style={{ fontSize: '.825rem' }}>{IUnit.DOLLARD}</span>
              </Text>
            </Flex>
          ) : (
            <Text size="2" color="red">
              You need to enter a{' '}
              <span style={{ textDecoration: 'underline' }}>Start date</span>{' '}
              and{' '}
              <span style={{ textDecoration: 'underline' }}>Server cost</span>{' '}
              on ALL your valid nodes before you can access this data.
            </Text>
          )}
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
          {!!logic.getNodes.valid.length && (
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
              <Flex justify="between" align="center">
                <ExportNodes />
                <Text size="2">
                  Total loaded nodes {logic.getNodes.valid.length}/
                  {Number(
                    logic.nodes?.length - logic.getNodes.invalid.length,
                  ) ?? 0}
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
                    {logic.getTableData.map((td) => {
                      const badNodes =
                        getCostPerTig(
                          td.serverCost,
                          td.average_rewards.reward,
                        ) > logic.tigPrice;
                      return (
                        <Table.Row
                          key={uuidv4()}
                          style={{
                            background: badNodes
                              ? 'rgba(255, 0, 0, .03)'
                              : 'initial',
                            color: badNodes ? '#ff9592' : 'initial',
                          }}
                        >
                          <Table.RowHeaderCell>
                            <a
                              target="_blank"
                              href={`https://tig-explorer.com/node/${td.id}`}
                              rel="noopener noreferrer"
                              style={{ color: 'white' }}
                            >
                              <Address address={td.id} copy />
                            </a>
                          </Table.RowHeaderCell>
                          <Table.Cell>
                            {Number(td.total_earned.reward).toFixed(2)}
                          </Table.Cell>
                          <Table.Cell>
                            {Number(td.average_rewards.reward).toFixed(2)}
                          </Table.Cell>
                          <Table.Cell>
                            {getCostPerTig(
                              td.serverCost,
                              td.average_rewards.reward,
                            ).toFixed(2)}
                          </Table.Cell>
                          <Table.Cell>
                            {Number(td.serverCost).toFixed(2)}
                          </Table.Cell>
                          <Table.Cell>{Number(td.coreNumber)}</Table.Cell>
                          <Table.Cell>{formatDate(td.startDate)}</Table.Cell>
                          <Table.Cell>{String(td.notes)}</Table.Cell>
                          <Table.Cell>
                            <Menu address={td.id} />
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
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
          {!!logic.getNodes.invalid.length && (
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
                        {logic.getNodes.invalid.map((td) => (
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
