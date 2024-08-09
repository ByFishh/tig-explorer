import { useTableData } from '@/store/tableDataReducer/tableDataReducer';
import { getAverageSinceStart } from '@/utils/getAverageSinceStart';
import { getCostSinceStartPerNode } from '@/utils/getCostSinceStartPerNode';
import { useMemo } from 'react';

export const useNodesData = () => {
  const { tableData } = useTableData();

  const getNodes = useMemo(() => {
    const valid = tableData.filter((i) => !i.invalid);
    const invalid = tableData.filter((i) => i.invalid);
    return { valid, invalid };
  }, [tableData]);

  const validNodesInformation = useMemo(() => {
    const allServerCost = getNodes.valid.reduce((total, item) => {
      return total + item.serverCost;
    }, 0);

    const allAreConfigured = getNodes.valid.every((td) => td.serverCost);

    const allHaveStartDate = getNodes.valid.every((gt) => gt.startDate);

    const averageEarned = getNodes.valid.reduce((total, item) => {
      return total + item.average_rewards.reward;
    }, 0);

    const totalEarned = getNodes.valid.reduce((total, item) => {
      return total + item.total_earned.reward;
    }, 0);

    const getTigEanedSinceStart = getNodes.valid.reduce(
      (acc, item) => {
        const { hours, total } = getAverageSinceStart(
          item.startDate ?? '',
          item.total_earned.reward,
        );
        acc.totalHours += hours;
        acc.grandTotal += total;
        return acc;
      },
      { totalHours: 0, grandTotal: 0 },
    );

    const costSinceStart = getNodes.valid.reduce((total, item) => {
      return (
        total +
        getCostSinceStartPerNode(
          item.serverCost,
          item.startDate ?? '',
          item.total_earned.reward,
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
  }, [getNodes.valid]);

  return { tableData, getNodes, validNodesInformation };
};
