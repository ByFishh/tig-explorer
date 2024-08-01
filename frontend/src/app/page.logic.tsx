import { useDialogs } from '@/store/dialogsReducer/dialogsReducer';
import { IAction as DialogsAction } from '@/store/dialogsReducer/dialogsReducer.types';
import { IAction as NodesAction } from '@/store/nodesReducer/nodesReducer.types';
import { useTigPrice } from '@/store/tigPriceReducer/tigPriceReducer';
import { IModals } from '@/types/IModals/IModals';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as ls from '../utils/localStorage';
import { ILocalStorageKey } from '@/types/ILocalStorageKey/ILocalStorageKey';
import { useNodes } from '@/store/nodesReducer/nodesReducer';

export const usePage = () => {
  const { handleSubmit, control } = useForm<{ search: string }>();
  const { dispatch: dialogsDispatch } = useDialogs();
  const { nodes, dispatch: nodesDispatch } = useNodes();

  useEffect(() => {
    getAllNodes();
  }, []);

  const getAllNodes = () => {
    const nodes = ls.getItem({ key: ILocalStorageKey.NODES });
    nodesDispatch({ action: NodesAction.SET_NODES, payload: nodes });
  };

  const { tigPrice } = useTigPrice();

  const nodeIsConfigured = () => {
    return false;
  };

  const openNodeDialog = useCallback(() => {
    dialogsDispatch({
      action: DialogsAction.OPEN_MODAL,
      payload: { isOpen: IModals.NODE },
    });
  }, []);

  return { tigPrice, nodeIsConfigured, control, openNodeDialog };
};
