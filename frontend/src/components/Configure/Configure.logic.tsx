import { INodeInputs } from '@/types/INodeInputs/INodeInputs';
import { useForm, SubmitHandler } from 'react-hook-form';
import { handleFormData } from './Configure.utils';
import * as ls from '../../utils/localStorage';
import { useNode } from '@/store/nodeReducer/nodeReducer';
import { ILocalStorageKey } from '@/types/ILocalStorageKey/ILocalStorageKey';
import { useEffect, useState } from 'react';

export const useConfigure = () => {
  const { handleSubmit, control } = useForm<INodeInputs>();
  const { node } = useNode();

  useEffect(() => {
    const id = node?.wallet_balance.address;
    if (!id) return;
    getInitialConfig();
  }, [node?.wallet_balance.address]);

  const getInitialConfig = () => {
    const id = node?.wallet_balance.address;
    if (!id) return;
    const currentConfig: INodeInputs = ls.findItemById();

    const config: INodeInputs = {
      notes: currentConfig.notes ?? '',
      serverCost: currentConfig.serverCost ?? 0,
      coreNumber: currentConfig.coreNumber ?? 0,
      startDate: currentConfig.startDate ?? undefined,
    };
  };

  const onSubmit: SubmitHandler<INodeInputs> = (data: INodeInputs) => {
    const item = handleFormData(data);
    const id = node?.wallet_balance.address;
    if (!id) return;
    const isAlreadyExist = ls.findItemById({ key: ILocalStorageKey.NODES, id });
    const newItem = { ...item, id: node.wallet_balance.address };
    if (isAlreadyExist) {
      // Edit
      ls.updateItem({ key: ILocalStorageKey.NODES, updatedItem: newItem });
    } else {
      // Add
      ls.pushItem({
        key: ILocalStorageKey.NODES,
        item: newItem,
      });
    }
    getInitialConfig();
  };

  return { control, handleSubmit, onSubmit };
};
