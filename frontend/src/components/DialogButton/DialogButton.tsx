import { IDialogButton } from '@/types/IDialogButton/IDialogButton';
import { Button } from '@radix-ui/themes';
import React from 'react';
import { useDialogButton } from './DialogButton.logic';

const DialogButton = (props: IDialogButton) => {
  const logic = useDialogButton(props);
  return (
    <Button size="2" onClick={logic.openDialog} style={{ minHeight: '35px' }}>
      {props.icon} {props.title}
    </Button>
  );
};

export default DialogButton;
