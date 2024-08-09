import { MutableRefObject } from 'react';
import { ITableData } from '../ITableData/ITableData';

export type ITableDataContext = {
  tableDataRef: MutableRefObject<ITableData[]>;
  onNodeDelete: (id: string) => void;
};
