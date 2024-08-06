import { useCallback } from 'react';
import { IAction as DialogsAction } from '@/store/dialogsReducer/dialogsReducer.types';
import { useDialogs } from '@/store/dialogsReducer/dialogsReducer';
import { IModals } from '@/types/IModals/IModals';
import { INodeDialogType } from '@/types/INodeDialogType/INodeDialogType';
import { IMenu } from '@/types/IMenu/IMenu';

export const useMenu = (props: IMenu) => {
  const { dispatch: dialogsDispatch } = useDialogs();

  const openNodeDialog = useCallback(() => {
    dialogsDispatch({
      action: DialogsAction.OPEN_MODAL,
      payload: {
        isOpen: IModals.NODE,
        data: { type: INodeDialogType.EDIT, id: props.address },
      },
    });
  }, [props.address]);

  const openDeleteDialog = useCallback(() => {
    dialogsDispatch({
      action: DialogsAction.OPEN_MODAL,
      payload: {
        isOpen: IModals.DELETE_NODE,
        data: { id: props.address, action: props.onAction },
      },
    });
  }, [props.address]);

  return { openNodeDialog, openDeleteDialog };
};
