export const daysArray = [
  "ראשון",
  "שני",
  "שלישי",
  "רביעי",
  "חמישי",
  "שישי",
  "שבת",
];

export const FindProviderWorkday = (provider, day) => {
  for (let wd of provider?.workdays) {
    if (wd.day === day) return true;
  }
  return false;
};