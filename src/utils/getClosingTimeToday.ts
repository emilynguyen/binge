/**
 * Gets current time in military time, used to compare against business closing times
 * @param now 
 * @returns current military time as int
 */
const getCurrentMilitaryTime = (now) => {
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return parseInt(`${hours + minutes}`);
}

/**
 * Converts military time to standard
 * @param time as an int or string
 * @returns standard time string
 */
const convertMilitaryTimeToStandard = (time) =>  {
  const timeString = String(time);
  
  if (!/^\d{4}$/.test(timeString)) {
    throw new Error('Invalid time format. Please provide a 4-digit time string.');
  }

  let hours = parseInt(timeString.substring(0, 2), 10);
  const minutes = timeString.substring(2);

  const period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert 0 to 12 for midnight and adjust hours for PM

  if (minutes === '00') {
    return `${hours}${period}`;
  }

  return `${hours}:${minutes}${period}`;
}

/**
 * Gets the closing time today for the given business
 * @param business 
 * @returns standard time string
 */
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