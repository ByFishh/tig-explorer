import { create } from 'zustand';
import { IAction, S } from './tigPriceReducer.types';
import * as ls from '../../utils/localStorage';
import { ILocalStorageKey } from '@/types/ILocalStorageKey/ILocalStorageKey';

const reducer = (
  state: S,
  args: { action: IAction; payload?: any },
): Partial<S> => {
  switch (args.action) {
    case IAction.SET_TIG_PRICE:
      return { tigPrice: Number(args.payload) };
    default:
      return state;
  }
};

const getInitialPriceTig = (): number => {
  try {
    return Number(ls.getItem({ key: ILocalStorageKey.TIG_PRICE }));
  } catch (error) {
    ls.initializeStorage({ key: ILocalStorageKey.TIG_PRICE, defaultValue: 0 });
    return 0;
  }
};

export const useTigPrice = create<S>()((set) => ({
  tigPrice: getInitialPriceTig(),
  dispatch: (args: { action: IAction; payload?: any }) =>
    set((state: S) => ({
      ...state,
      ...reducer(state, args),
    })),
}));
