import React from 'react';
import {
  DotsHorizontalIcon,
  EraserIcon,
  Pencil1Icon,
} from '@radix-ui/react-icons';
import { Button, Flex, Popover, Text } from '@radix-ui/themes';
import { useMenu } from './Menu.logic';
import { IMenu } from '@/types/IMenu/IMenu';

const Menu = (props: IMenu) => {
  const logic = useMenu(props);

  const styles = {
    width: '100%',
    minWidth: '100px',
    justifyContent: 'start',
    borderRadius: 4,
  };

  return (
    <Popover.Root>
      <Popover.Trigger>
        <DotsHorizontalIcon />
      </Popover.Trigger>
      <Popover.Content style={{ padding: '0rem 0', overflow: 'initial' }}>
        <Flex direction="column" justify="start" align="start">
          <Button
            disabled={!!props.disable?.edit}
            color="gray"
            variant="soft"
            style={styles}
            onClick={logic.openNodeDialog}
          >
            <Pencil1Icon /> Edit
          </Button>
          <Button
            disabled={!!props.disable?.delete}
            color="red"
            variant="soft"
            style={styles}
            onClick={logic.openDeleteDialog}
          >
            <EraserIcon /> Delete
          </Button>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
};

export default Menu;
