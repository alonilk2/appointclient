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
  if(provider?.workdays) {
    for (let wd of provider?.workdays) {
      if (wd.day === day) return true;
    }
  }
  return false;
};