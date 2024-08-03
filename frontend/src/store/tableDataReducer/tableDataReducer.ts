import { create } from 'zustand';
import { IAction, S } from './tableDataReducer.types';
import * as array from '@/utils/array';

const reducer = (
  state: S,
  args: { action: IAction; payload?: any },
): Partial<S> => {
  const { action, payload } = args;
  switch (action) {
    case IAction.SET_TABLE_DATA:
      return { tableData: payload };
    case IAction.ADD_TABLE_DATA:
      return { tableData: [...state.tableData, payload] };
    case IAction.UPDATE_TABLE_DATA:
      const updatedArr = array._updateArray(state.tableData, payload);
      if (!updatedArr) return state;
      return { tableData: updatedArr };
    case IAction.REMOVE_TABLE_DATA:
      return { tableData: state.tableData.filter((n) => n.id !== payload) };
    default:
      return state;
  }
};

export const useTableData = create<S>()((set) => ({
  tableData: [],
  dispatch: (args: { action: IAction; payload?: any }) =>
    set((state: S) => ({
      ...state,
      ...reducer(state, args),
    })),
}));
