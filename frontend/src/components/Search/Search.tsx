import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { TextField } from '@radix-ui/themes';
import React from 'react';
import { Control, Controller } from 'react-hook-form';

const Search = (props: { control: Control<{ search: string }> }) => {
  return (
    <Controller
      name="search"
      control={props.control}
      render={({ field }) => (
        <TextField.Root
          style={{ width: '100%', minHeight: '35px' }}
          size="2"
          type="text"
          onChange={field.onChange}
          defaultValue={''}
        >
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
      )}
    ></Controller>
  );
};

export default Search;
