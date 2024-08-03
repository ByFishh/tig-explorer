import { INodeInputs } from '@/types/INodeInputs/INodeInputs';
import { useForm, SubmitHandler } from 'react-hook-form';
import { handleFormData } from './Configure.utils';
import * as ls from '../../utils/localStorage';
import { useNode } from '@/store/nodeReducer/nodeReducer';
import { ILocalStorageKey } from '@/types/ILocalStorageKey/ILocalStorageKey';
import { useEffect, useState } from 'react';
import { IConfigure } from '@/types/IConfigure/IConfigure';

const inputs: INodeInputs = {
  id: '',
  notes: '',
  serverCost: 0,
  coreNumber: 0,
  startDate: undefined,
};

export const useConfigure = (props: IConfigure) => {
  const { handleSubmit, control, setValue } = useForm<INodeInputs>({
    defaultValues: inputs,
  });
  const { node } = useNode();

  useEffect(() => {
    const id = node?.wallet_balance.address;
    if (!id) return;
    getInitialConfig();
  }, [node?.wallet_balance.address]);

  const getInitialConfig = () => {
    const id = node?.wallet_balance.address;
    if (!id) return;
    const currentConfig: INodeInputs = ls.findItemById({
      key: ILocalStorageKey.NODES,
      id,
    });
    const config: INodeInputs = handleFormData(currentConfig);
    Object.keys(inputs).map((i) =>
      setValue(i as any, config[i as keyof INodeInputs]),
    );
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

    if (data.serverCost) props.invokeCardRender && props.invokeCardRender();
    getInitialConfig();
  };

  return { control, handleSubmit, onSubmit };
};
