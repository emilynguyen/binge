import convertMilitaryTimeToStandard from "@/utils/convertMilitaryTimeToStandard";

function getCurrentMilitaryTime(now) {
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return parseInt(`${hours + minutes}`);
}

const getClosingTimeToday = (business) => {
    if (!business || Object.keys(business).length === 0) {
      return null;
    }

    // Returns int for day of week (0 = Sun)
    // -1 offset to use for Yelp (0 = Mon)
    const now = new Date();
    const today = (now.getDay() + 6) % 7;
    const hours = business.business_hours[0].open;
    const hoursToday = hours.filter((hours) => hours.day === today);
  

    if (hoursToday.length === 0) {
      return null;
    }

    // Handle cases with multiple openings/closings
    if (hoursToday.length >= 2) {
      const currTime = getCurrentMilitaryTime(now);

      // Check which opening window we are in
      hoursToday.forEach((window) => {
        const closing = parseInt(window.end);

        // Return if closing for this window hasn't happened yet
        if (currTime < closing) {
          return convertMilitaryTimeToStandard(closing);
        }
      });
    }
  
    // Assuming the last entry for today is the closing time
    const closingTime = hoursToday[hoursToday.length - 1].end;
    return convertMilitaryTimeToStandard(closingTime);
  }

  export default getClosingTimeToday;