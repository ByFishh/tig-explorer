export const convertMonthToHour = (valueInMonth: number) => {
  const averageDaysPerMonth = 30;
  const hoursPerDay = 24;
  const valuePerDay = valueInMonth / averageDaysPerMonth;
  const valuePerHour = valuePerDay / hoursPerDay;
  return valuePerHour;
};
