import { create } from 'zustand';
import { IAction, S } from './benchmarkerReducer.types';

const reducer = (
  state: S,
  args: { action: IAction; payload?: any },
): Partial<S> => {
  const { action, payload } = args;
  switch (action) {
    case IAction.SET_BENCHMARKER:
      return { benchmarker: payload };
    case IAction.REMOVE_BENCHMARKER:
      return { benchmarker: null };
    default:
      return state;
  }
};

export const useBenchmarker = create<S>()((set) => ({
  benchmarker: null,
  dispatch: (args: { action: IAction; payload?: any }) =>
    set((state: S) => ({
      ...state,
      ...reducer(state, args),
    })),
}));
