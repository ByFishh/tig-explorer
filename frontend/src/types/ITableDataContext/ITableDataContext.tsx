import { MutableRefObject } from 'react';
import { ITableData } from '../ITableData/ITableData';

export type ITableDataContext = {
  tableDataRef: MutableRefObject<ITableData[]>;
  onBenchmarkerDelete: (id: string) => void;
};
