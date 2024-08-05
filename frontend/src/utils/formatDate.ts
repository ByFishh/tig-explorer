export const formatDate = (date: string | null): string => {
  if (!date) return '';
  const [year, month, day] = date.split('-');
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};
