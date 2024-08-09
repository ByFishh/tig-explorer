import { CircleBackslashIcon } from '@radix-ui/react-icons';
import {
  Callout,
  Checkbox,
  Flex,
  Heading,
  Table,
  Text,
} from '@radix-ui/themes';
import React from 'react';
import Menu from '../Menu/Menu';
import { v4 as uuidv4 } from 'uuid';
import { useInvalidNodes } from './InvalidNodes.logic';

const InvalidNodes = () => {
  const logic = useInvalidNodes();
  return (
    <>
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
                  This is where you&apos;ll find all your invalid nodes. They
                  represent all the nodes that have an invalid address or that
                  have not been correctly loaded by the server. If this is the
                  case, you can contact us here:{' '}
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
    </>
  );
};

export default InvalidNodes;
