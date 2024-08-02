import React, { useState } from 'react';
import { displayAddress } from '@/utils/displayAddress';
import * as Popover from '@radix-ui/react-popover';
import { Text } from '@radix-ui/themes';
import './Address.css';

const Address = (props: { address: string }) => {
  const [toggle, setToggle] = useState<boolean>(false);
  return (
    <Popover.Root open={toggle}>
      <Popover.Trigger
        asChild
        onMouseEnter={() => setToggle(true)}
        onMouseLeave={() => setToggle(false)}
      >
        <Text>{displayAddress(props.address)}</Text>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="PopoverContent">
          <Text style={{ fontSize: '.85rem' }} size="1">
            {props.address}
          </Text>
          <Popover.Close aria-label="Close"></Popover.Close>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default Address;
