export const convertDateStringToDateTime = (dateString: string): Date => {
  const dateTimeString = `${dateString}T00:00:00.000Z`;
  const dateObject = new Date(dateTimeString);

  return dateObject;
};
