import { IBenchmarkerInputs } from '@/types/IBenchmarkerInputs/IBenchmarkerInputs';
import { useForm, SubmitHandler } from 'react-hook-form';
import { handleFormData } from './Configure.utils';
import * as ls from '../../utils/localStorage';
import { useBenchmarker } from '@/store/benchmarkerReducer/benchmarkerReducer';
import { ILocalStorageKey } from '@/types/ILocalStorageKey/ILocalStorageKey';
import { useEffect, useState } from 'react';
import { IConfigure } from '@/types/IConfigure/IConfigure';
import { formatDate } from '@/utils/formatDate';

const inputs: IBenchmarkerInputs = {
  id: '',
  notes: '',
  serverCost: 0,
  coreNumber: 0,
  startDate: '',
};

export const useConfigure = (props: IConfigure) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { isDirty },
  } = useForm<IBenchmarkerInputs>({
    defaultValues: inputs,
  });
  const { benchmarker: benchmarker } = useBenchmarker();

  useEffect(() => {
    const id = benchmarker?.address;
    if (!id) return;
    getInitialConfig();
  }, [benchmarker?.address]);

  const getInitialConfig = () => {
    const id = benchmarker?.address;
    if (!id) return;
    const currentConfig: IBenchmarkerInputs = ls.findItemById({
      key: ILocalStorageKey.BENCHMARKERS,
      id,
    });
    const config: IBenchmarkerInputs = handleFormData(currentConfig);
    Object.keys(inputs).map((i) =>
      setValue(i as any, config[i as keyof IBenchmarkerInputs]),
    );
  };

  const onSubmit: SubmitHandler<IBenchmarkerInputs> = (
    data: IBenchmarkerInputs,
  ) => {
    data.startDate = formatDate(data.startDate);
    const item = handleFormData(data);
    const id = benchmarker?.address;
    if (!id) return;
    const isAlreadyExist = ls.findItemById({
      key: ILocalStorageKey.BENCHMARKERS,
      id,
    });
    const newItem = { ...item, id: benchmarker.address };
    if (isAlreadyExist) {
      // Edit
      ls.updateItem({
        key: ILocalStorageKey.BENCHMARKERS,
        updatedItem: newItem,
      });
    } else {
      // Add
      ls.pushItem({
        key: ILocalStorageKey.BENCHMARKERS,
        item: newItem,
      });
    }

    if (data.serverCost) props.invokeCardRender && props.invokeCardRender();
    getInitialConfig();
  };

  return { control, handleSubmit, onSubmit, isDirty };
};
