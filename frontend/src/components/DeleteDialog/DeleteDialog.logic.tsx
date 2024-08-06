'use client';
import { useDialogs } from '@/store/dialogsReducer/dialogsReducer';
import { IAction as DialogAction } from '@/store/dialogsReducer/dialogsReducer.types';
import { ILocalStorageKey } from '@/types/ILocalStorageKey/ILocalStorageKey';
import { useCallback } from 'react';
import * as ls from '../../utils/localStorage';
import { IAction as NodesAction } from '../../store/nodesReducer/nodesReducer.types';
import { useNodes } from '@/store/nodesReducer/nodesReducer';
import { useTableData } from '@/store/tableDataReducer/tableDataReducer';
import { IAction as TableDataAction } from '@/store/tableDataReducer/tableDataReducer.types';
import { useNotifications } from '@/store/notificationsReducer/notificationsReducer';
import { IAction as NotifcationAction } from '@/store/notificationsReducer/notificationsReducer.types';
import { v4 as uuidv4 } from 'uuid';
import { INotificationState } from '@/types/INotificationState/INotificationState';

export const useDeleteDialog = () => {
  const { isOpen, data, dispatch: dialogsDispatch } = useDialogs();
  const { dispatch: nodesDispatch } = useNodes();
  const { dispatch: tableDataDispatch } = useTableData();
  const { dispatch: notificationsDispatch } = useNotifications();

  const closeModal = useCallback(() => {
    dialogsDispatch({ action: DialogAction.CLOSE_MODAL });
  }, []);

  const handleSubmit = () => {
    ls.removeItem({
      key: ILocalStorageKey.NODES,
      id: data.id,
    });
    data.action(data.id);
    nodesDispatch({ action: NodesAction.REMOVE_NODE, payload: data.id });
    tableDataDispatch({
      action: TableDataAction.REMOVE_TABLE_DATA,
      payload: data.id,
    });

    notificationsDispatch({
      action: NotifcationAction.ADD_NOTIFICATION,
      payload: {
        id: uuidv4(),
        state: INotificationState.SUCCESS,
        message: 'Node deleted with success',
      },
    });

    closeModal();
  };

  return { isOpen, closeModal, handleSubmit };
};
