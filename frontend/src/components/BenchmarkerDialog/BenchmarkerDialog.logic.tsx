import { useDialogs } from '@/store/dialogsReducer/dialogsReducer';
import { IBenchmarkerInputs } from '@/types/IBenchmarkerInputs/IBenchmarkerInputs';
import { useCallback, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IAction as DialogAction } from '../../store/dialogsReducer/dialogsReducer.types';
import { IAction as BenchmarkersAction } from '../../store/benchmarkersReducer/benchmarkersReducer.types';
import * as ls from '../../utils/localStorage';
import { ILocalStorageKey } from '@/types/ILocalStorageKey/ILocalStorageKey';
import { handleFormData } from '../Configure/Configure.utils';
import { usebenchmarkers } from '@/store/benchmarkersReducer/benchmarkersReducer';
import * as array from '@/utils/array';
import { IbenchmarkerDialogType } from '@/types/IBenchmarkerDialogType/IBenchmarkerDialogType';
import { useTableData } from '@/store/tableDataReducer/tableDataReducer';
import { IAction as TableDataAction } from '@/store/tableDataReducer/tableDataReducer.types';
import { formatDate } from '@/utils/formatDate';
import { useNotifications } from '@/store/notificationsReducer/notificationsReducer';
import { IAction as NotifcationAction } from '@/store/notificationsReducer/notificationsReducer.types';
import { v4 as uuidv4 } from 'uuid';
import { INotificationState } from '@/types/INotificationState/INotificationState';

const inputs: IBenchmarkerInputs = {
  id: '',
  notes: '',
  serverCost: 0,
  coreNumber: 0,
  startDate: '',
};

export const useBenchmarkerDialog = () => {
  const { isOpen, data, dispatch: dialogsDispatch } = useDialogs();
  const { dispatch: benchmarkersDispatch } = usebenchmarkers();
  const { tableData, dispatch: tableDataDispatch } = useTableData();
  const { dispatch: notificationsDispatch } = useNotifications();

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { isValid, isDirty },
  } = useForm<IBenchmarkerInputs>({
    mode: 'onChange',
    defaultValues: inputs,
  });

  useEffect(() => {
    getInitialConfig();
  }, [data?.id]);

  const getInitialConfig = () => {
    if (!data?.id) return;
    const currentConfig: IBenchmarkerInputs = ls.findItemById({
      key: ILocalStorageKey.BENCHMARKERS,
      id: data.id,
    });
    const config: IBenchmarkerInputs = handleFormData(currentConfig);
    Object.keys(inputs).map((i) =>
      setValue(i as any, config[i as keyof IBenchmarkerInputs]),
    );
  };

  const benchmarkerAlreadyExist = (fieldValue: string) => {
    if (data.type === IbenchmarkerDialogType.EDIT) return true;
    const alreadyExist = ls.findItemById({
      key: ILocalStorageKey.BENCHMARKERS,
      id: fieldValue,
    });
    if (alreadyExist)
      return 'You already have a benchmarker associated with this address. You cannot create a new one with this address. But you can modify it';
    return true;
  };

  const onSubmit: SubmitHandler<IBenchmarkerInputs> = (
    data: IBenchmarkerInputs,
  ) => {
    data.startDate = formatDate(data.startDate);
    const item = handleFormData(data);
    const id = data.id;
    if (!id) return;
    const isAlreadyExist = array._findById(tableData as any[], id);
    if (isAlreadyExist) {
      const updatedItem = { ...isAlreadyExist, ...item };
      ls.updateItem({ key: ILocalStorageKey.BENCHMARKERS, updatedItem: item });
      benchmarkersDispatch({
        action: BenchmarkersAction.UPDATE_BENCHMARKER,
        payload: item,
      });
      tableDataDispatch({
        action: TableDataAction.UPDATE_TABLE_DATA,
        payload: updatedItem,
      });

      notificationsDispatch({
        action: NotifcationAction.ADD_NOTIFICATION,
        payload: {
          id: uuidv4(),
          state: INotificationState.SUCCESS,
          message: 'Benchmarker edited with success',
        },
      });
    } else {
      const newItem = { ...item, id };
      ls.pushItem({
        key: ILocalStorageKey.BENCHMARKERS,
        item: newItem,
      });
      benchmarkersDispatch({
        action: BenchmarkersAction.ADD_BENCHMARKER,
        payload: newItem,
      });
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
    benchmarkerAlreadyExist,
    type: data?.type,
    isValid,
    isDirty,
  };
};
