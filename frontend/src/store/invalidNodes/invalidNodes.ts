import { create } from 'zustand';
import { IAction, S } from './invalidNodes.types';
import * as array from '@/utils/array';

const reducer = (
  state: S,
  args: { action: IAction; payload?: any },
): Partial<S> => {
  const { action, payload } = args;
  switch (action) {
    case IAction.ADD_INVALID_NODES:
      return { invalidNodes: [...state.invalidNodes, payload] };
    case IAction.EDIT_INVALID_NODES:
      const updatedArr = array._updateArray(state.invalidNodes, payload);
      if (!updatedArr) return state;
      return { invalidNodes: updatedArr };
    case IAction.REMOVE_INVALID_NODES:
      return {
        invalidNodes: state.invalidNodes.filter((n) => n.id !== payload),
      };
    default:
      return state;
  }
};

export const useInvalidNodes = create<S>()((set) => ({
  invalidNodes: [],
  dispatch: (args: { action: IAction; payload?: any }) =>
    set((state: S) => ({
      ...state,
      ...reducer(state, args),
    })),
}));
