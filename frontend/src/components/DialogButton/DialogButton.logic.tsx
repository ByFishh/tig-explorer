import { useDialogs } from '@/store/dialogsReducer/dialogsReducer';
import { IAction } from '@/store/dialogsReducer/dialogsReducer.types';
import { IDialogButton } from '@/types/IDialogButton/IDialogButton';
import { useCallback } from 'react';

export const useDialogButton = (props: IDialogButton) => {
  const { dispatch } = useDialogs();

  const openDialog = useCallback(() => {
    dispatch({
      action: IAction.OPEN_MODAL,
      payload: { isOpen: props.dialog, data: props.data },
    });
  }, [props.dialog, props.data]);

  return { openDialog };
};
