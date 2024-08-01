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

export default function Home() {
  const logic = usePage();
  const items: ICard[] = [
    {
      title: 'Total earned',
      description: 'Review here the total earned by your node',
      forceRender: true,
      data: [
        {
          title: 'Total earned',
          value: 100,
          unit: IUnit.TIG,
        },
        // {
        //   title: 'Total earned',
        //   value: convertUnit(100 ?? 0, logic.tigPrice),
        //   unit: IUnit.DOLLARD,
        // },
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
            {logic.nodeIsConfigured() ? (
              <Flex style={{ flexFlow: 'column' }}>
                {/* <Text as="p" size="2" mb="0" color="gray">
                  Cost per {IUnit.TIG} ({IUnit.DOLLARD})
                </Text>
                <Text as="p" size="7" weight="medium">
                  <span style={{ fontSize: '.825rem' }}>{IUnit.DOLLARD}</span>
                  {logic.getCostPerTig().toFixed(2)}
                </Text> */}
              </Flex>
            ) : (
              <Text size="2" color="red">
                You must enter a server cost in the{' '}
                <span style={{ textDecoration: 'underline' }}>
                  Configure Node
                </span>{' '}
                before you can access this data.
              </Text>
            )}
          </Flex>
          <Flex style={{ flexFlow: 'column' }}>
            <Text as="p" size="2" mb="0" color="gray">
              Average earned ({IUnit.TIG_PER_HOUR})
            </Text>
            <Text as="p" size="7" weight="medium">
              {Number(100).toFixed(2)}
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
          <Grid gap="4" columns="2">
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
                ></TextField.Root>
              )}
            ></Controller>
            <Button size="3" onClick={logic.openNodeDialog}>
              <PlusIcon /> Add node
            </Button>
          </Flex>
          <Flex direction="column" py="4" my="6">
            <Flex justify="end">
              <Text size="3">Loaded nodes 0/6</Text>
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
              </Table.Root>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Section>
  );
}
