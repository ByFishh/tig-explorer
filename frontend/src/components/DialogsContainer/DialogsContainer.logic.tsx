import { useDialogs } from '@/store/dialogsReducer/dialogsReducer';
import { IModals } from '@/types/IModals/IModals';
import { useMemo } from 'react';
import BenchmarkerDialog from '../BenchmarkerDialog/BenchmarkerDialog';
import DollarDialog from '../DollarDialog/DollarDialog';
import DeleteDialog from '../DeleteDialog/DeleteDialog';

export const useDialogsContainer = () => {
  const { isOpen } = useDialogs();

  const displayDialogs = useMemo(
    () => [
      {
        key: IModals.BENCHMARKER,
        show: isOpen === IModals.BENCHMARKER,
        content: <BenchmarkerDialog />,
      },
      {
        key: IModals.DELETE_BENCHMARKER,
        show: isOpen === IModals.DELETE_BENCHMARKER,
        content: <DeleteDialog />,
      },
      {
        key: IModals.TIG_PRICE,
        show: isOpen === IModals.TIG_PRICE,
        content: <DollarDialog />,
      },
    ],
    [isOpen],
  );

  return { displayDialogs };
};
