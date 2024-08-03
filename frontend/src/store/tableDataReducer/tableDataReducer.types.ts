import { ITableData } from '@/types/ITableData/ITableData';
import { Immutable } from '../../types/Immutable/Immutable';

export type S = {
  tableData: Immutable<ITableData[]>;
  dispatch: (args: { action: IAction; payload?: unknown }) => void;
};

export enum IAction {
  SET_TABLE_DATA = 'set_table_data',
  ADD_TABLE_DATA = 'add_table_data',
  UPDATE_TABLE_DATA = 'update_table_data',
  REMOVE_TABLE_DATA = 'remove_table_data',
}
