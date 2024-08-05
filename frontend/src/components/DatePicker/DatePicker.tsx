import React, { ChangeEventHandler } from 'react';
import './DatePicker.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const DatePicker = (props: {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: Date | string | null | undefined;
}) => {
  return (
    <input
      onChange={props.onChange}
      type="date"
      className={`radix-ui-date-picker ${inter.className}`}
      value={String(props.value)}
    />
  );
};

export default DatePicker;
