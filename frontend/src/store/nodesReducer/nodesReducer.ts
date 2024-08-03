import { create } from 'zustand';
import { IAction, S } from './nodesReducer.types';
import * as array from '@/utils/array';

const reducer = (
  state: S,
  args: { action: IAction; payload?: any },
): Partial<S> => {
  const { action, payload } = args;
  switch (action) {
    case IAction.SET_NODES:
      return { nodes: payload };
    case IAction.ADD_NODE:
      return { nodes: [...state.nodes, payload] };
    case IAction.UPDATE_NODE:
      const updatedArr = array._updateArray(state.nodes, payload);
      if (!updatedArr) return state;
      return { nodes: updatedArr };
    case IAction.REMOVE_NODE:
      return { nodes: state.nodes.filter((n) => n.id !== payload) };
    default:
      return state;
  }
};

export const useNodes = create<S>()((set) => ({
  nodes: [],
  dispatch: (args: { action: IAction; payload?: any }) =>
    set((state: S) => ({
      ...state,
      ...reducer(state, args),
    })),
}));
