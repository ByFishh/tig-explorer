import { getBenchmarkerPreview } from '@/apis/benchmarker/benchmarker.action';
import { usebenchmarkers } from '@/store/benchmarkersReducer/benchmarkersReducer';
import { useTableData } from '@/store/tableDataReducer/tableDataReducer';
import { ILocalStorageKey } from '@/types/ILocalStorageKey/ILocalStorageKey';
import { useEffect } from 'react';
import { IAction as BenchmarkersAction } from '@/store/benchmarkersReducer/benchmarkersReducer.types';
import { IAction as TableDataAction } from '@/store/tableDataReducer/tableDataReducer.types';
import { ITableData } from '@/types/ITableData/ITableData';
import { useTableDataContext } from '@/context/TableDataContext/TableDataContext';
import { IBenchmarkersContainer } from '@/types/IBenchmarkersContainer/IBenchmarkersContainer';
import * as ls from '../../utils/localStorage';

export const useBenchmarkersContainer = (props: IBenchmarkersContainer) => {
  const { benchmarkers, dispatch: benchmarkersDispatch } = usebenchmarkers();
  const { dispatch: tableDataDispatch } = useTableData();
  const { tableDataRef } = useTableDataContext();

  useEffect(() => {
    if (benchmarkers.length) return;
    getAllBenchmarkers();
  }, []);

  useEffect(() => {
    if (!benchmarkers || JSON.stringify(benchmarkers) === JSON.stringify([]))
      return;
    getAllServerBenchmarkers();
  }, [benchmarkers]);

  const getAllBenchmarkers = () => {
    const benchmarkers = ls.getItem({ key: ILocalStorageKey.BENCHMARKERS });
    benchmarkersDispatch({
      action: BenchmarkersAction.SET_BENCHMARKERS,
      payload: benchmarkers ?? [],
    });
    if (JSON.stringify(benchmarkers) === JSON.stringify([]) || !benchmarkers)
      props.trigger(false);
  };

  const getAllServerBenchmarkers = async () => {
    const benchmarkersPreview: ITableData[] = tableDataRef.current;
    const batchSize = 10;

    for (let i = 0; i < benchmarkers.length; i += batchSize) {
      const benchmarkerBatch = benchmarkers.slice(i, i + batchSize);

      const batchPromises = benchmarkerBatch.map(async (n: any) => {
        const benchmarkerIsAlreadyHere = tableDataRef.current.find(
          (i: any) => i.id === n.id,
        );
        if (benchmarkerIsAlreadyHere) return null;

        try {
          const regex = new RegExp('^(0x)?[0-9a-fA-F]{40}$');
          if (!regex.test(n.id)) throw new Error('Invalid address');

          const benchmarkerPreview = await getBenchmarkerPreview(n.id);
          return { ...benchmarkerPreview, ...n, invalid: false } as ITableData;
        } catch {
          return {
            total_earned: { address: n.id, reward: 0 },
            average_rewards: { address: n.id, reward: 0 },
            ...n,
            invalid: true,
          } as ITableData;
        }
      });

      const newBenchmarkers = await Promise.all(batchPromises);
      const validNewBenchmarkers = newBenchmarkers.filter(
        (benchmarker: any) => benchmarker !== null,
      ) as ITableData[];

      tableDataRef.current.push(...validNewBenchmarkers);

      tableDataDispatch({
        action: TableDataAction.SET_TABLE_DATA,
        payload: JSON.parse(JSON.stringify(benchmarkersPreview)),
      });
    }
  };
};
