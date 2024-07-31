'use client';
import { useDialogs } from '@/store/dialogsReducer/dialogsReducer';
import { useTigPrice } from '@/store/tigPriceReducer/tigPriceReducer';
import { IAction as TigPriceAction } from '@/store/tigPriceReducer/tigPriceReducer.types';
import { IAction as DialogAction } from '@/store/dialogsReducer/dialogsReducer.types';
import { useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as ls from '../../utils/localStorage';
import { ILocalStorageKey } from '@/types/ILocalStorageKey/ILocalStorageKey';

export const useDollarDialog = () => {
  const { handleSubmit, control } = useForm<{ tigPrice: number }>();
  const { tigPrice, dispatch: tigPriceDispatch } = useTigPrice();
  const { isOpen, dispatch: dialogsDispatch } = useDialogs();

  const onSubmit: SubmitHandler<{ tigPrice: number }> = (data: {
    tigPrice: number;
  }) => {
    tigPriceDispatch({
      action: TigPriceAction.SET_TIG_PRICE,
      payload: data.tigPrice,
    });
    ls.setItem({ key: ILocalStorageKey.TIG_PRICE, item: data.tigPrice });
    closeModal();
  };

  const closeModal = useCallback(() => {
    dialogsDispatch({ action: DialogAction.CLOSE_MODAL });
  }, []);

  return { control, handleSubmit, onSubmit, tigPrice, isOpen, closeModal };
};
