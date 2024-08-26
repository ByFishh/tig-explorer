'use client';
import { useDialogs } from '@/store/dialogsReducer/dialogsReducer';
import { IAction as DialogAction } from '@/store/dialogsReducer/dialogsReducer.types';
import { ILocalStorageKey } from '@/types/ILocalStorageKey/ILocalStorageKey';
import { useCallback, useContext } from 'react';
import * as ls from '../../utils/localStorage';
import { IAction as BenchmarkersAction } from '../../store/benchmarkersReducer/benchmarkersReducer.types';
import { usebenchmarkers } from '@/store/benchmarkersReducer/benchmarkersReducer';
import { useTableData } from '@/store/tableDataReducer/tableDataReducer';
import { IAction as TableDataAction } from '@/store/tableDataReducer/tableDataReducer.types';
import { useNotifications } from '@/store/notificationsReducer/notificationsReducer';
import { IAction as NotifcationAction } from '@/store/notificationsReducer/notificationsReducer.types';
import { v4 as uuidv4 } from 'uuid';
import { INotificationState } from '@/types/INotificationState/INotificationState';
import { useTableDataContext } from '@/context/TableDataContext/TableDataContext';

export const useDeleteDialog = () => {
  const { isOpen, data, dispatch: dialogsDispatch } = useDialogs();
  const { dispatch: benchmarkersDispatch } = usebenchmarkers();
  const { dispatch: tableDataDispatch } = useTableData();
  const { dispatch: notificationsDispatch } = useNotifications();
  const { onBenchmarkerDelete: onBenchmarkerDelete } = useTableDataContext();

  const closeModal = useCallback(() => {
    dialogsDispatch({ action: DialogAction.CLOSE_MODAL });
  }, []);

  const handleSubmit = () => {
    ls.removeItem({
      key: ILocalStorageKey.BENCHMARKERS,
      id: data.id,
    });
    onBenchmarkerDelete(data.id);
    benchmarkersDispatch({ action: BenchmarkersAction.REMOVE_BENCHMARKER, payload: data.id });
    tableDataDispatch({
      action: TableDataAction.REMOVE_TABLE_DATA,
      payload: data.id,
    });

    notificationsDispatch({
      action: NotifcationAction.ADD_NOTIFICATION,
      payload: {
        id: uuidv4(),
        state: INotificationState.SUCCESS,
        message: 'Benchmarker deleted with success',
      },
    });

    closeModal();
  };

  return { isOpen, closeModal, handleSubmit };
};
