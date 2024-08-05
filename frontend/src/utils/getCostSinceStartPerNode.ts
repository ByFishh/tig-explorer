import { convertMonthToHour } from './convertMonthToHour';
import { unformatDate } from './formatDate';

export const getCostSinceStartPerNode = (
  serverCost: number,
  startDate: string,
  totalEarned: number,
) => {
  const serverCostInHour = convertMonthToHour(serverCost);
  const formatDate = unformatDate(startDate);
  const start = new Date(formatDate);
  const now = new Date();
  const diffInMilliseconds = now.getTime() - start.getTime();
  const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
  const cost = diffInHours * serverCostInHour;
  return cost / totalEarned;
};
