import { Button, Flex, Heading, Table, Text } from '@radix-ui/themes';
import React from 'react';
import Search from '../Search/Search';
import { PlusIcon } from '@radix-ui/react-icons';
import ExportNodes from '../ExportNodes/ExportNodes';
import { v4 as uuidv4 } from 'uuid';
import TableCell from '../TableCell/TableCell';
import { getCostPerTig } from '@/utils/getCostPerTig';
import Address from '../Address/Address';
import Menu from '../Menu/Menu';
import { formatDate } from '@/utils/formatDate';
import { validNodesHeaders } from './ValidNodes.data';
import { useValidNodes } from './ValidNodes.logic';
import DialogButton from '../DialogButton/DialogButton';
import { IModals } from '@/types/IModals/IModals';
import { INodeDialogType } from '@/types/INodeDialogType/INodeDialogType';

const ValidNodes = () => {
  const logic = useValidNodes();
  return (
    <>
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
            <Search control={logic.control} />
          </form>

          <DialogButton
            dialog={IModals.NODE}
            title="Add node"
            icon={<PlusIcon />}
            data={{ type: INodeDialogType.ADD }}
          />
        </Flex>
      )}
      <Flex direction="column" py="4" my="6">
        {!!logic.getTableData.length && (
          <Flex justify="between" align="center">
            <ExportNodes />
            <Text size="2">
              Total loaded nodes {logic.getNodes.valid.length}/
              {Number(logic.nodes?.length - logic.getNodes.invalid.length) ?? 0}
            </Text>
          </Flex>
        )}
        <Flex my="4">
          {!!logic.getTableData.length ? (
            <Table.Root size="3" style={{ width: '100%' }} variant="surface">
              <Table.Header>
                <Table.Row>
                  {validNodesHeaders.map((h) => (
                    <TableCell key={uuidv4()}>
                      <Text size="2">
                        {h.txt}{' '}
                        {h.unit && (
                          <span style={{ fontSize: '.725rem' }}>
                            ({h.unit})
                          </span>
                        )}
                      </Text>
                    </TableCell>
                  ))}
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {logic.getTableData.map((td) => {
                  const badNodes =
                    getCostPerTig(td.serverCost, td.average_rewards.reward) >
                    logic.tigPrice;
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
                      <TableCell>
                        <a
                          target="_blank"
                          href={`https://tig-explorer.com/node/${td.id}`}
                          rel="noopener noreferrer"
                          style={{ color: 'white' }}
                        >
                          <Address address={td.id} copy />
                        </a>
                      </TableCell>

                      <TableCell>
                        {Number(td.total_earned.reward).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        {Number(td.average_rewards.reward).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        {getCostPerTig(
                          td.serverCost,
                          td.average_rewards.reward,
                        ).toFixed(2)}
                      </TableCell>
                      <TableCell>{Number(td.serverCost).toFixed(2)}</TableCell>
                      <TableCell>{Number(td.coreNumber)}</TableCell>
                      <TableCell>{formatDate(td.startDate)}</TableCell>
                      <TableCell>{String(td.notes)}</TableCell>
                      <TableCell>
                        <Menu address={td.id} />
                      </TableCell>
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
                  <DialogButton
                    dialog={IModals.NODE}
                    title="Add node"
                    icon={<PlusIcon />}
                    data={{ type: INodeDialogType.ADD }}
                  />
                </Flex>
              )}
            </Flex>
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default ValidNodes;
