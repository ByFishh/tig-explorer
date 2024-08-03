'use client';
import { useDialogs } from '@/store/dialogsReducer/dialogsReducer';
import { IAction as DialogAction } from '@/store/dialogsReducer/dialogsReducer.types';
import { ILocalStorageKey } from '@/types/ILocalStorageKey/ILocalStorageKey';
import { useCallback } from 'react';
import * as ls from '../../utils/localStorage';
import { IAction as NodesAction } from '../../store/nodesReducer/nodesReducer.types';
import { useNodes } from '@/store/nodesReducer/nodesReducer';
import { useTableData } from '@/store/tableDataReducer/tableDataReducer';
import { useInvalidNodes } from '@/store/invalidNodes/invalidNodes';
import { IAction as TableDataAction } from '@/store/tableDataReducer/tableDataReducer.types';
import { IAction as InvalidNodesAction } from '@/store/invalidNodes/invalidNodes.types';

export const useDeleteDialog = () => {
  const { isOpen, data, dispatch: dialogsDispatch } = useDialogs();
  const { dispatch: nodesDispatch } = useNodes();
  const { dispatch: tableDataDispatch } = useTableData();
  const { dispatch: invalidNodesDispatch } = useInvalidNodes();

  const closeModal = useCallback(() => {
    dialogsDispatch({ action: DialogAction.CLOSE_MODAL });
  }, []);

  const handleSubmit = () => {
    ls.removeItem({
      key: ILocalStorageKey.NODES,
      id: data.id,
    });
    nodesDispatch({ action: NodesAction.REMOVE_NODE, payload: data.id });
    tableDataDispatch({
      action: TableDataAction.REMOVE_TABLE_DATA,
      payload: data.id,
    });
    invalidNodesDispatch({
      action: InvalidNodesAction.REMOVE_INVALID_NODES,
      payload: data.id,
    });

    closeModal();
  };

  return { isOpen, closeModal, handleSubmit };
};
