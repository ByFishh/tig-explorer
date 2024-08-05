export const formatDate = (date: string | null): string => {
  if (!date) return '';
  if (date.includes('/')) return date;
  const [year, month, day] = date.split('-');
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};

export const unformatDate = (date: string | null): string => {
  if (!date) return '';
  if (date.includes('-')) return date;
  const [day, month, year] = date.split('/');
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};
