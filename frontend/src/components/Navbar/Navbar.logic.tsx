import { useDialogs } from '@/store/dialogsReducer/dialogsReducer';
import { IAction } from '@/store/dialogsReducer/dialogsReducer.types';
import { useTigPrice } from '@/store/tigPriceReducer/tigPriceReducer';
import { IModals } from '@/types/IModals/IModals';
import { useCallback } from 'react';

export const useNavbar = () => {
  const { tigPrice } = useTigPrice();
  const { dispatch } = useDialogs();

  const openDollarDialog = useCallback(() => {
    dispatch({
      action: IAction.OPEN_MODAL,
      payload: { isOpen: IModals.TIG_PRICE },
    });
  }, []);

  return { tigPrice, openDollarDialog };
};
