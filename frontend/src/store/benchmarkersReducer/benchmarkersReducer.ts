import { create } from 'zustand';
import { IAction, S } from './benchmarkersReducer.types';
import * as array from '@/utils/array';

const reducer = (
  state: S,
  args: { action: IAction; payload?: any },
): Partial<S> => {
  const { action, payload } = args;
  switch (action) {
    case IAction.SET_BENCHMARKERS:
      return { benchmarkers: payload };
    case IAction.ADD_BENCHMARKER:
      return { benchmarkers: [...state.benchmarkers, payload] };
    case IAction.UPDATE_BENCHMARKER:
      const updatedArr = array._updateArray(state.benchmarkers, payload);
      if (!updatedArr) return state;
      return { benchmarkers: updatedArr };
    case IAction.REMOVE_BENCHMARKER:
      return {
        benchmarkers: state.benchmarkers.filter((n) => n.id !== payload),
      };
    default:
      return state;
  }
};

export const usebenchmarkers = create<S>()((set) => ({
  benchmarkers: [],
  dispatch: (args: { action: IAction; payload?: any }) =>
    set((state: S) => ({
      ...state,
      ...reducer(state, args),
    })),
}));
