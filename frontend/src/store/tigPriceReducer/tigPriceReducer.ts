import { create } from 'zustand';
import { IAction, S } from './tigPriceReducer.types';

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

export const useTigPrice = create<S>()((set) => ({
  tigPrice: 0,
  dispatch: (args: { action: IAction; payload?: any }) =>
    set((state: S) => ({
      ...state,
      ...reducer(state, args),
    })),
}));
