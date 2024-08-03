import React, { useState } from 'react';
import { displayAddress } from '@/utils/displayAddress';
import { Popover, Text } from '@radix-ui/themes';

const Address = (props: { address: string }) => {
  const [toggle, setToggle] = useState<boolean>(false);
  return (
    <Popover.Root open={toggle}>
      <Popover.Trigger
        onMouseEnter={() => setToggle(true)}
        onMouseLeave={() => setToggle(false)}
      >
        <Text>{displayAddress(props.address)}</Text>
      </Popover.Trigger>
      <Popover.Content>
        <Text style={{ fontSize: '.85rem' }} size="1">
          {props.address}
        </Text>
      </Popover.Content>
    </Popover.Root>
  );
};

export default Address;
