'use client';
import {
  ArrowTopRightIcon,
  Cross1Icon,
  Cross2Icon,
} from '@radix-ui/react-icons';
import {
  Box,
  Dialog,
  Flex,
  TextField,
  Text,
  Button,
  IconButton,
} from '@radix-ui/themes';
import React from 'react';
import { Controller } from 'react-hook-form';
import { useDollarDialog } from './DollarDialog.logic';
import { IModals } from '@/types/IModals/IModals';
import { DialogOverlay, DialogPortal } from '@radix-ui/react-dialog';

const DollarDialog = () => {
  const logic = useDollarDialog();
  return (
    <>
      <Dialog.Root open={logic.isOpen === IModals.TIG_PRICE}>
        <Dialog.Content size="4">
          <Flex justify="between" align="center">
            <Dialog.Title size="5">TIG price</Dialog.Title>
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
            Review here global information about your node
          </Dialog.Description>
          <Flex width="100%" style={{ flexFlow: 'column' }}>
            <Text as="label" size="2" weight="regular" mb="1" color="gray">
              TIG price
            </Text>
            <Box>
              <Controller
                name="tigPrice"
                control={logic.control}
                render={({ field }) => (
                  <TextField.Root
                    size="3"
                    type="number"
                    style={{ paddingLeft: '0' }}
                    onChange={field.onChange}
                    defaultValue={logic.tigPrice}
                  >
                    <TextField.Slot
                      style={{ paddingLeft: '0' }}
                    ></TextField.Slot>
                    <TextField.Slot>
                      <Text as="label" size="2" weight="regular" color="gray">
                        $
                      </Text>
                    </TextField.Slot>
                  </TextField.Root>
                )}
              ></Controller>
              <Flex justify={'end'} mt="4">
                <Box>
                  <Button onClick={logic.handleSubmit(logic.onSubmit)}>
                    <ArrowTopRightIcon /> Set
                  </Button>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default DollarDialog;
