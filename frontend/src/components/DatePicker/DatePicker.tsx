import React, { ChangeEvent, ChangeEventHandler } from 'react';
import './DatePicker.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const DatePicker = (props: {
  onChange: ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <input
      onChange={props.onChange}
      type="date"
      className={`radix-ui-date-picker ${inter.className}`}
    />
  );
};

export default DatePicker;
