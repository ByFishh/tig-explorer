import { useTableData } from '@/store/tableDataReducer/tableDataReducer';
import { getAverageSinceStart } from '@/utils/getAverageSinceStart';
import { getCostSinceStartPerBenchmarker } from '@/utils/getCostSinceStartPerbenchmarker';
import { useMemo } from 'react';

export const useBenchmarkersData = () => {
  const { tableData } = useTableData();

  const getBenchmarkers = useMemo(() => {
    const valid = tableData.filter((i) => !i.invalid);
    const invalid = tableData.filter((i) => i.invalid);
    return { valid, invalid };
  }, [tableData]);

  const validBenchmarkersInformation = useMemo(() => {
    const allServerCost = getBenchmarkers.valid.reduce((total, item) => {
      return total + item.serverCost;
    }, 0);

    const allAreConfigured = getBenchmarkers.valid.every((td) => td.serverCost);

    const allHaveStartDate = getBenchmarkers.valid.every((gt) => gt.startDate);

    const averageEarned = getBenchmarkers.valid.reduce((total, item) => {
      return total + item.average_rewards;
    }, 0);

    const totalEarned = getBenchmarkers.valid.reduce((total, item) => {
      return total + item.total_earned;
    }, 0);

    const getTigEanedSinceStart = getBenchmarkers.valid.reduce(
      (acc, item) => {
        const { hours, total } = getAverageSinceStart(
          item.startDate ?? '',
          item.total_earned,
        );
        acc.totalHours += hours;
        acc.grandTotal += total;
        return acc;
      },
      { totalHours: 0, grandTotal: 0 },
    );

    const costSinceStart = getBenchmarkers.valid.reduce((total, item) => {
      return (
        total +
        getCostSinceStartPerBenchmarker(
          item.serverCost,
          item.startDate ?? '',
          item.total_earned,
        )
      );
    }, 0);

    return {
      allServerCost,
      allAreConfigured,
      averageEarned,
      totalEarned,
      allHaveStartDate,
      costSinceStart,
      getTigEanedSinceStart:
        getTigEanedSinceStart.grandTotal / getTigEanedSinceStart.totalHours,
    };
  }, [getBenchmarkers.valid]);

  return {
    tableData,
    getBenchmarkers,
    validBenchmarkersInformation,
  };
};
