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
      if (wd.day === day) return wd;
    }
  }
  return false;
};

export const darkModeBox = { backgroundColor: "rgb(30 30 30)", border: "rgb(74, 74, 74)", color: 'white' };