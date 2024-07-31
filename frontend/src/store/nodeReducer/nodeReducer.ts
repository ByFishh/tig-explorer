import { create } from 'zustand';
import { IAction, S } from './nodeReducer.types';

const reducer = (
  state: S,
  args: { action: IAction; payload?: any },
): Partial<S> => {
  const { action, payload } = args;
  switch (action) {
    case IAction.SET_NODE:
      return { node: payload };
    case IAction.REMOVE_NODE:
      return { node: null };
    default:
      return state;
  }
};

export const useNode = create<S>()((set) => ({
  node: null,
  dispatch: (args: { action: IAction; payload?: any }) =>
    set((state: S) => ({
      ...state,
      ...reducer(state, args),
    })),
}));
