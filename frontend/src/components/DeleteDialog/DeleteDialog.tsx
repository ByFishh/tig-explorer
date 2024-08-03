import { IModals } from '@/types/IModals/IModals';
import { CircleBackslashIcon, Cross1Icon } from '@radix-ui/react-icons';
import {
  Box,
  Button,
  Callout,
  Dialog,
  Flex,
  IconButton,
  Text,
} from '@radix-ui/themes';
import React from 'react';
import { useDeleteDialog } from './DeleteDialog.logic';

const DeleteDialog = () => {
  const logic = useDeleteDialog();
  return (
    <Dialog.Root open={logic.isOpen === IModals.DELETE_NODE}>
      <Dialog.Content size="4">
        <Flex justify="between" align="center">
          <Dialog.Title size="5">Delete node</Dialog.Title>
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
          <Callout.Root mt="4" color="red">
            <Callout.Icon>
              <CircleBackslashIcon />
            </Callout.Icon>
            <Callout.Text>
              <span style={{ textDecoration: 'underline' }}>WARNING</span> If
              you delete your node, there will be no way of recovering it. You
              will of course be able to recreate it with the same information.
            </Callout.Text>
          </Callout.Root>
        </Dialog.Description>
        <Flex width="100%" justify="end" gap="2">
          <Button color="gray" variant="outline" onClick={logic.closeModal}>
            Cancel
          </Button>
          <Button color="red" variant="solid" onClick={logic.handleSubmit}>
            Delete
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DeleteDialog;
