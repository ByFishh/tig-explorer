import { Flex, Heading, Table, Text } from '@radix-ui/themes';
import React from 'react';
import Search from '../Search/Search';
import { PlusIcon } from '@radix-ui/react-icons';
import ExportBenchmarkers from '../ExportBenchmarkers/ExportBenchmarkers';
import { v4 as uuidv4 } from 'uuid';
import TableCell from '../TableCell/TableCell';
import { getCostPerTig } from '@/utils/getCostPerTig';
import Address from '../Address/Address';
import Menu from '../Menu/Menu';
import { formatDate } from '@/utils/formatDate';
import { validBenchmarkersHeaders } from './ValidBenchmarkers.data';
import { useValidBenchmarkers } from './ValidBenchmarkers.logic';
import DialogButton from '../DialogButton/DialogButton';
import { IModals } from '@/types/IModals/IModals';
import { IbenchmarkerDialogType } from '@/types/IBenchmarkerDialogType/IBenchmarkerDialogType';

const ValidBenchmarkers = () => {
  const logic = useValidBenchmarkers();
  return (
    <>
      <Flex py="4" mt="6">
        <Heading as="h2" weight="medium">
          Benchmarkers
        </Heading>
      </Flex>
      {!!logic.getBenchmarkers.valid.length && (
        <Flex gap="4">
          <form
            onSubmit={logic.handleSubmit(logic.onSubmit)}
            style={{ width: '100%' }}
          >
            <Search control={logic.control} />
          </form>

          <DialogButton
            dialog={IModals.BENCHMARKER}
            title="Add benchmarker"
            icon={<PlusIcon />}
            data={{ type: IbenchmarkerDialogType.ADD }}
          />
        </Flex>
      )}
      <Flex direction="column" py="4" my="6">
        {!!logic.getTableData.length && (
          <Flex justify="between" align="center">
            <ExportBenchmarkers />
            <Text size="2">
              Total loaded benchmarkers {logic.getBenchmarkers.valid.length}/
              {Number(
                logic.benchmarkers?.length -
                  logic.getBenchmarkers.invalid.length,
              ) ?? 0}
            </Text>
          </Flex>
        )}
        <Flex my="4">
          {!!logic.getTableData.length ? (
            <Table.Root size="3" style={{ width: '100%' }} variant="surface">
              <Table.Header>
                <Table.Row>
                  {validBenchmarkersHeaders.map((h) => (
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
                  const badBenchmarkers =
                    getCostPerTig(td.serverCost, td.average_rewards) >
                    logic.tigPrice;
                  return (
                    <Table.Row
                      key={uuidv4()}
                      style={{
                        background: badBenchmarkers
                          ? 'rgba(255, 0, 0, .03)'
                          : 'initial',
                        color: badBenchmarkers ? '#ff9592' : 'initial',
                      }}
                    >
                      <TableCell>
                        <a
                          target="_blank"
                          href={`https://tig-explorer.com/benchmarker/${td.id}`}
                          rel="noopener noreferrer"
                          style={{ color: 'white' }}
                        >
                          <Address address={td.id} copy />
                        </a>
                      </TableCell>

                      <TableCell>
                        {Number(td.total_earned).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        {Number(td.average_rewards).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        {getCostPerTig(
                          td.serverCost,
                          td.average_rewards,
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
                <Text color="red">No benchmarker was found with this address</Text>
              ) : (
                <Flex direction="column" align="center" gap="4">
                  <Text>
                    you don&apos;t have a benchmarker yet, you can create one right
                    here
                  </Text>
                  <DialogButton
                    dialog={IModals.BENCHMARKER}
                    title="Add benchmarker"
                    icon={<PlusIcon />}
                    data={{ type: IbenchmarkerDialogType.ADD }}
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

export default ValidBenchmarkers;
