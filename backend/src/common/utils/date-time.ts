export const thirtyDaysFromNow = () => {
  return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
};

export const fortyFiveMinutesFromNow = () => {
  return new Date(Date.now() + 45 * 60 * 1000);
};
