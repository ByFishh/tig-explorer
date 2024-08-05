import { convertMonthToHour } from './convertMonthToHour';

export const getCostPerTig = (serverCost: number, reward: number) => {
  const serverCostInHour = convertMonthToHour(serverCost);
  return serverCostInHour / reward;
};
