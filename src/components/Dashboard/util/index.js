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

export const darkModeBox = { backgroundColor: "#18191b", borderColor: "#4a4a4a", color: 'white' };