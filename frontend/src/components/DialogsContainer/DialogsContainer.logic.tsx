import { useDialogs } from '@/store/dialogsReducer/dialogsReducer';
import { IModals } from '@/types/IModals/IModals';
import { useMemo } from 'react';
import NodeDialog from '../NodeDialog/NodeDialog';
import DollarDialog from '../DollarDialog/DollarDialog';
import DeleteDialog from '../DeleteDialog/DeleteDialog';

export const useDialogsContainer = () => {
  const { isOpen } = useDialogs();

  const displayDialogs = useMemo(
    () => [
      {
        key: IModals.NODE,
        show: isOpen === IModals.NODE,
        content: <NodeDialog />,
      },
      {
        key: IModals.DELETE_NODE,
        show: isOpen === IModals.DELETE_NODE,
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
