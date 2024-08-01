import { useDialogs } from '@/store/dialogsReducer/dialogsReducer';
import { INodeInputs } from '@/types/INodeInputs/INodeInputs';
import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IAction as DialogAction } from '../../store/dialogsReducer/dialogsReducer.types';
import { IAction as NodesAction } from '../../store/nodesReducer/nodesReducer.types';
import * as ls from '../../utils/localStorage';
import { ILocalStorageKey } from '@/types/ILocalStorageKey/ILocalStorageKey';
import { handleFormData } from '../Configure/Configure.utils';
import { useNodes } from '@/store/nodesReducer/nodesReducer';

const inputs: INodeInputs & { address: string } = {
  address: '',
  notes: '',
  serverCost: 0,
  coreNumber: 0,
  startDate: new Date(''),
};

export const useNodeDialog = () => {
  const { handleSubmit, control, reset } = useForm<
    INodeInputs & { address: string }
  >({
    mode: 'onChange',
    defaultValues: inputs,
  });

  const { isOpen, dispatch: dialogsDispatch } = useDialogs();
  const { dispatch: nodesDispatch } = useNodes();

  const nodeAlreadyExist = (fieldValue: string) => {
    const alreadyExist = ls.findItemById({
      key: ILocalStorageKey.NODES,
      id: fieldValue,
    });
    if (alreadyExist)
      return 'You already have a node associated with this address. You cannot create a new one with this address. But you can modify it';
    return true;
  };

  const onSubmit: SubmitHandler<INodeInputs & { address: string }> = (
    data: INodeInputs & { address: string },
  ) => {
    const item = handleFormData(data);
    const id = data.address;
    if (!id) return;
    const isAlreadyExist = ls.findItemById({ key: ILocalStorageKey.NODES, id });
    if (isAlreadyExist) return;
    const newItem = { ...item, id };
    ls.pushItem({
      key: ILocalStorageKey.NODES,
      item: newItem,
    });
    nodesDispatch({ action: NodesAction.ADD_NODE, payload: newItem });
    closeModal();
  };

  const closeModal = useCallback(() => {
    dialogsDispatch({ action: DialogAction.CLOSE_MODAL });
    reset();
  }, []);

  return {
    control,
    handleSubmit,
    onSubmit,
    isOpen,
    closeModal,
    nodeAlreadyExist,
  };
};
