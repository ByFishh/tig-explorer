import { IModals } from '@/types/IModals/IModals';
import {
  CircleBackslashIcon,
  Cross1Icon,
  Pencil1Icon,
  PlusIcon,
} from '@radix-ui/react-icons';
import {
  Box,
  Button,
  Callout,
  Dialog,
  Flex,
  Grid,
  IconButton,
  Text,
  TextArea,
  TextField,
} from '@radix-ui/themes';
import React, { useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { useNodeDialog } from './NodeDialog.logic';
import DatePicker from '../DatePicker/DatePicker';
import { INodeDialogType } from '@/types/INodeDialogType/INodeDialogType';
import ImportExcel from '../ImportExcel/ImportExcel';
import ImportExcelTemplate from '../ImportExcelTemplate/ImportExcelTemplate';

const NodeDialog = () => {
  const logic = useNodeDialog();

  const UI = useMemo(
    () => ({
      title: logic.type === INodeDialogType.ADD ? 'Add node' : 'Edit node',
      buttonLabel: logic.type === INodeDialogType.ADD ? 'Add' : 'Edit',
      buttonIcon:
        logic.type === INodeDialogType.ADD ? <PlusIcon /> : <Pencil1Icon />,
    }),
    [logic.type],
  );

  return (
    <Dialog.Root open={logic.isOpen === IModals.NODE}>
      <Dialog.Content size="4">
        <Flex justify="between" align="center">
          <Dialog.Title size="5">{UI.title}</Dialog.Title>
          <Dialog.Close>
            <Flex>
              <IconButton
                style={{ background: 'transparent' }}
                onClick={logic.closeModal}
              >
                <Cross1Icon width="15" height="15" />
              </IconButton>
            </Flex>
          </Dialog.Close>
        </Flex>
        <Dialog.Description size="2" color="gray" mb="5">
          Handle every information relative to your node
        </Dialog.Description>

        <Flex width={'100%'} direction="column">
          <Flex direction="column" mb="5">
            <Box>
              <Controller
                name="id"
                control={logic.control}
                rules={{
                  required: {
                    value: true,
                    message: 'This field is required',
                  },
                  maxLength: {
                    value: 42,
                    message: 'Your address may not exceed 42 characters.',
                  },
                  validate: logic.nodeAlreadyExist,
                }}
                render={({ field, fieldState }) => (
                  <>
                    <Text
                      as="label"
                      size="2"
                      weight="regular"
                      mb="1"
                      color={field.value ? 'gray' : 'red'}
                    >
                      Address (required)
                    </Text>
                    <TextField.Root
                      color={field.value ? 'gray' : 'red'}
                      size="3"
                      type="text"
                      onChange={field.onChange}
                      value={field.value}
                      disabled={logic.type === INodeDialogType.EDIT}
                    />
                    {fieldState.error && (
                      <Callout.Root mt="4" color="red">
                        <Callout.Icon>
                          <CircleBackslashIcon />
                        </Callout.Icon>
                        <Callout.Text>{fieldState.error.message}</Callout.Text>
                      </Callout.Root>
                    )}
                  </>
                )}
              ></Controller>
            </Box>
          </Flex>
          <Controller
            name="notes"
            control={logic.control}
            rules={{ maxLength: 100 }}
            render={({ field }) => (
              <>
                <Flex align={'center'} justify={'between'}>
                  <Text as="label" size="2" weight="medium" mb="1">
                    Notes (optional)
                  </Text>
                  <Text as="span" size="2" weight="medium" mb="1">
                    {field.value ? field.value.length : 0}/100
                  </Text>
                </Flex>
                <TextArea
                  maxLength={100}
                  style={{ width: '100%' }}
                  mb="4"
                  onChange={field.onChange}
                  value={field.value}
                />
              </>
            )}
          ></Controller>
        </Flex>
        <Flex mt="4" style={{ flexFlow: 'column' }}>
          <Box mb="5">
            <Text as="p" size="4" weight="medium" mb="1">
              Personnal server
            </Text>
            <Text as="p" size="2" color="gray">
              Setup all personnal datas relative to your node
            </Text>
          </Box>
          <Grid columns="2" gap="6">
            <Flex width="100%" style={{ flexFlow: 'column' }} mb="4">
              <Text as="label" size="2" weight="regular" mb="1" color="gray">
                Start date (optional)
              </Text>
              <Controller
                name="startDate"
                control={logic.control}
                render={({ field }) => (
                  <DatePicker onChange={field.onChange} value={field.value} />
                )}
              ></Controller>
            </Flex>
            <Flex width="100%" style={{ flexFlow: 'column' }}>
              <Text as="label" size="2" weight="regular" mb="1" color="gray">
                Core number (optional)
              </Text>
              <Box maxWidth="250px">
                <Controller
                  name="coreNumber"
                  control={logic.control}
                  render={({ field }) => (
                    <TextField.Root
                      size="3"
                      type="number"
                      onChange={field.onChange}
                      value={field.value}
                    />
                  )}
                ></Controller>
              </Box>
            </Flex>
          </Grid>
          <Flex width="100%" style={{ flexFlow: 'column' }}>
            <Text as="label" size="2" weight="regular" mb="1" color="gray">
              Server cost (optional)
            </Text>
            <Box mb="4">
              <Controller
                name="serverCost"
                control={logic.control}
                render={({ field }) => (
                  <TextField.Root
                    size="3"
                    type="number"
                    style={{ paddingLeft: '0' }}
                    onChange={field.onChange}
                    value={field.value}
                  >
                    <TextField.Slot
                      style={{ paddingLeft: '0' }}
                    ></TextField.Slot>
                    <TextField.Slot>
                      <Text as="label" size="2" weight="regular" color="gray">
                        $/month
                      </Text>
                    </TextField.Slot>
                  </TextField.Root>
                )}
              ></Controller>
            </Box>
            <Flex justify={'end'}>
              <Box>
                <Button
                  onClick={logic.handleSubmit(logic.onSubmit)}
                  disabled={!logic.isValid}
                >
                  {UI.buttonIcon} {UI.buttonLabel}
                </Button>
              </Box>
            </Flex>
          </Flex>
        </Flex>
        {logic.type === INodeDialogType.ADD && (
          <>
            <Flex my="4" justify="center" align="center">
              <Text>OR</Text>
            </Flex>
            <Flex direction="column">
              <Text size="4" weight="bold">
                Import nodes from Excel
              </Text>
              <ImportExcelTemplate />
              <ImportExcel title="Import nodes from Excel" />
            </Flex>
          </>
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default NodeDialog;
