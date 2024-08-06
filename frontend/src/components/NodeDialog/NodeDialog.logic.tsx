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
import { IAction as TableDataAction } from '@/store/tableDataReducer/tableDataReducer.types';
import { formatDate } from '@/utils/formatDate';
import { useNotifications } from '@/store/notificationsReducer/notificationsReducer';
import { IAction as NotifcationAction } from '@/store/notificationsReducer/notificationsReducer.types';
import { v4 as uuidv4 } from 'uuid';
import { INotificationState } from '@/types/INotificationState/INotificationState';

const inputs: INodeInputs = {
  id: '',
  notes: '',
  serverCost: 0,
  coreNumber: 0,
  startDate: '',
};

export const useNodeDialog = () => {
  const { isOpen, data, dispatch: dialogsDispatch } = useDialogs();
  const { dispatch: nodesDispatch } = useNodes();
  const { tableData, dispatch: tableDataDispatch } = useTableData();
  const { dispatch: notificationsDispatch } = useNotifications();

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { isValid, isDirty },
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
    data.startDate = formatDate(data.startDate);
    const item = handleFormData(data);
    const id = data.id;
    if (!id) return;
    const isAlreadyExist = array._findById(tableData as any[], id);
    if (isAlreadyExist) {
      const updatedItem = { ...isAlreadyExist, ...item };
      ls.updateItem({ key: ILocalStorageKey.NODES, updatedItem: item });
      nodesDispatch({ action: NodesAction.UPDATE_NODE, payload: item });
      tableDataDispatch({
        action: TableDataAction.UPDATE_TABLE_DATA,
        payload: updatedItem,
      });

      notificationsDispatch({
        action: NotifcationAction.ADD_NOTIFICATION,
        payload: {
          id: uuidv4(),
          state: INotificationState.SUCCESS,
          message: 'Node edited with success',
        },
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
    isDirty,
  };
};
