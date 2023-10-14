export const formatDate = date => {
  const year = date.getFullYear(); // Get the year (e.g., 2023)
  const month = date.getMonth() + 1; // Get the month (0-based, so add 1)
  const day = date.getDate(); // Get the day of the month

  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
};
