import { unformatDate } from './formatDate';

export const getAverageSinceStart = (
  startDate: string,
  total: number,
): { hours: number; total: number } => {
  const formatDate = unformatDate(startDate);
  const start = new Date(formatDate);
  const now = new Date();
  const diffInMilliseconds = now.getTime() - start.getTime();
  const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
  return { hours: diffInHours, total };
};
