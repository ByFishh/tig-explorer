import { useDialogs } from '@/store/dialogsReducer/dialogsReducer';
import { INodeInputs } from '@/types/INodeInputs/INodeInputs';
import { useCallback, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IAction as DialogAction } from '../../store/dialogsReducer/dialogsReducer.types';
import { IAction as NodesAction } from '../../store/nodesReducer/nodesReducer.types';
import * as ls from '../../utils/localStorage';
import { ILocalStorageKey } from '@/types/ILocalStorageKey/ILocalStorageKey';
import { handleFormData } from '../Configure/Configure.utils';
import { useNodes } from '@/store/nodesReducer/nodesReducer';
import * as array from '@/utils/array';
import { INodeDialogType } from '@/types/INodeDialogType/INodeDialogType';
import { useTableData } from '@/store/tableDataReducer/tableDataReducer';
import { useInvalidNodes } from '@/store/invalidNodes/invalidNodes';
import { IAction as TableDataAction } from '@/store/tableDataReducer/tableDataReducer.types';
import { IAction as InvalidNodesAction } from '@/store/invalidNodes/invalidNodes.types';

const inputs: INodeInputs = {
  id: '',
  notes: '',
  serverCost: 0,
  coreNumber: 0,
  startDate: new Date(''),
};

export const useNodeDialog = () => {
  const { isOpen, data, dispatch: dialogsDispatch } = useDialogs();
  const { dispatch: nodesDispatch } = useNodes();
  const { tableData, dispatch: tableDataDispatch } = useTableData();
  const { dispatch: invalidNodesDispatch } = useInvalidNodes();

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { isValid },
  } = useForm<INodeInputs>({
    mode: 'onChange',
    defaultValues: inputs,
  });

  useEffect(() => {
    getInitialConfig();
  }, [data?.id]);

  const getInitialConfig = () => {
    if (!data?.id) return;
    const currentConfig: INodeInputs = ls.findItemById({
      key: ILocalStorageKey.NODES,
      id: data.id,
    });
    const config: INodeInputs = handleFormData(currentConfig);
    Object.keys(inputs).map((i) =>
      setValue(i as any, config[i as keyof INodeInputs]),
    );
  };

  const nodeAlreadyExist = (fieldValue: string) => {
    if (data.type === INodeDialogType.EDIT) return true;
    const alreadyExist = ls.findItemById({
      key: ILocalStorageKey.NODES,
      id: fieldValue,
    });
    if (alreadyExist)
      return 'You already have a node associated with this address. You cannot create a new one with this address. But you can modify it';
    return true;
  };

  const onSubmit: SubmitHandler<INodeInputs> = (data: INodeInputs) => {
    const item = handleFormData(data);
    const id = data.id;
    if (!id) return;
    const isAlreadyExist = array._findById(tableData as any[], id);
    if (isAlreadyExist) {
      const updatedItem = { ...isAlreadyExist, ...data };
      ls.updateItem({ key: ILocalStorageKey.NODES, updatedItem: data });
      nodesDispatch({ action: NodesAction.UPDATE_NODE, payload: data });
      tableDataDispatch({
        action: TableDataAction.UPDATE_TABLE_DATA,
        payload: updatedItem,
      });
      invalidNodesDispatch({
        action: InvalidNodesAction.EDIT_INVALID_NODES,
        payload: data,
      });
    } else {
      const newItem = { ...item, id };
      ls.pushItem({
        key: ILocalStorageKey.NODES,
        item: newItem,
      });
      nodesDispatch({ action: NodesAction.ADD_NODE, payload: newItem });
    }
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
    type: data?.type,
    isValid,
  };
};
