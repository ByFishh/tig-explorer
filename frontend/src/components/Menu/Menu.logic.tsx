import { useCallback } from 'react';
import { IAction as DialogsAction } from '@/store/dialogsReducer/dialogsReducer.types';
import { useDialogs } from '@/store/dialogsReducer/dialogsReducer';
import { IModals } from '@/types/IModals/IModals';
import { IbenchmarkerDialogType } from '@/types/IBenchmarkerDialogType/IBenchmarkerDialogType';
import { IMenu } from '@/types/IMenu/IMenu';

export const useMenu = (props: IMenu) => {
  const { dispatch: dialogsDispatch } = useDialogs();

  const openBenchmarkerDialog = useCallback(() => {
    dialogsDispatch({
      action: DialogsAction.OPEN_MODAL,
      payload: {
        isOpen: IModals.BENCHMARKER,
        data: { type: IbenchmarkerDialogType.EDIT, id: props.address },
      },
    });
  }, [props.address]);

  const openDeleteDialog = useCallback(() => {
    dialogsDispatch({
      action: DialogsAction.OPEN_MODAL,
      payload: {
        isOpen: IModals.DELETE_BENCHMARKER,
        data: { id: props.address, action: props.onAction },
      },
    });
  }, [props.address]);

  return { openBenchmarkerDialog, openDeleteDialog };
};
