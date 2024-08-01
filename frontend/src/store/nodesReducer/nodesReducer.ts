import { create } from 'zustand';
import { IAction, S } from './nodesReducer.types';

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
