import { ITableData } from '@/types/ITableData/ITableData';
import { ITableDataContext } from '@/types/ITableDataContext/ITableDataContext';
import React, {
  createContext,
  ReactNode,
  useRef,
  useCallback,
  useContext,
} from 'react';

const Context = createContext<ITableDataContext | undefined>(undefined);

export const TableDataContext: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const tableDataRef = useRef<ITableData[]>([]);

  const onNodeDelete = useCallback((id: string) => {
    tableDataRef.current = tableDataRef.current.filter((tdr) => tdr.id !== id);
  }, []);

  return (
    <Context.Provider value={{ tableDataRef, onNodeDelete }}>
      {children}
    </Context.Provider>
  );
};

const _useTableDataContext = (): ITableDataContext => {
  const context = useContext(Context);
  if (!context) throw new Error('TableDataContext is not defined');
  return context;
};

export const useTableDataContext = _useTableDataContext;
