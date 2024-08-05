import { create } from 'zustand';
import { IAction, S } from './notificationsReducer.types';
import * as array from '../../utils/array';

const reducer = (
  state: S,
  args: { action: IAction; payload?: any },
): Partial<S> => {
  const { action, payload } = args;
  switch (action) {
    case IAction.ADD_NOTIFICATION:
      return {
        notifications:
          array._addArray(state.notifications, payload) ?? state.notifications,
      };
    case IAction.REMOVE_NOTIFICATION:
      return {
        notifications:
          array._removeArray(state.notifications, payload) ??
          state.notifications,
      };
    default:
      return state;
  }
};

export const useNotifications = create<S>()((set) => ({
  notifications: [],
  dispatch: (args: { action: IAction; payload?: any }) =>
    set((state: S) => ({
      ...state,
      ...reducer(state, args),
    })),
}));
