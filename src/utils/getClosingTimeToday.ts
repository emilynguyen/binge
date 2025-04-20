/**
 * Get the closing time for a business today.
 * If the business has already closed, show the most recent closing time.
 * If the business closes and reopens, use the upcoming closing time.
 *
 * @param {Object} hours - The business hours object.
 * @returns {string} The next or most recent closing time in "h:mmA" format (e.g., "11:30PM"), or "hA" format (e.g., "9PM"), or a message if closed.
 */
function getClosingTimeToday(hours) {
  if (!hours || Object.keys(hours).length === 0) return null;

  const now = new Date(); // Current date and time
  const currentDay = now.getUTCDay() === 0 ? 7 : now.getUTCDay(); // Map Sunday (0) to 7
  const currentTime = parseInt(
    `${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}`
  ); // Current time as an integer (e.g., 0604)

  // Filter today's schedule based on the current day
  const todaySchedule = hours.regular.filter((entry) => entry.day === currentDay);
  const yesterdaySchedule = hours.regular.filter((entry) => entry.day === (currentDay === 1 ? 7 : currentDay - 1));

  // Initialize variables to track recent and upcoming closing times
  let recentClosingTime = null;
  let upcomingClosingTime = null;

  // Helper function to format time in "h:mmA" or "hA" format
  const formatTime = (time) => {
    const closingHour = Math.floor(time / 100); // Extracts the hour
    const closingMinute = time % 100; // Extracts the minute
    const isPM = closingHour >= 12;
    const formattedHour = closingHour > 12 ? closingHour - 12 : closingHour === 0 ? 12 : closingHour;

    // Include minutes only if they are non-zero
    return closingMinute > 0
      ? `${formattedHour}:${closingMinute.toString().padStart(2, '0')}${isPM ? 'PM' : 'AM'}`
      : `${formattedHour}${isPM ? 'PM' : 'AM'}`;
  };

  // Process today's schedule
  for (const period of todaySchedule) {
    const closingTime = parseInt(period.close);

    if (closingTime > currentTime) {
      // First upcoming closing time
      if (!upcomingClosingTime) {
        upcomingClosingTime = closingTime;
      }
    } else {
      // Update most recent closing time (if already passed)
      recentClosingTime = closingTime;
    }
  }

  // Handle schedules that roll over past midnight (yesterday's closing times)
  for (const period of yesterdaySchedule) {
    const closingTime = parseInt(period.close);

    // If the closing time is past midnight (e.g., 2:00 AM), adjust logic
    if (closingTime < 1200 && currentTime < closingTime) {
      upcomingClosingTime = closingTime;
    } else if (closingTime < 1200 && currentTime >= closingTime) {
      recentClosingTime = closingTime;
    }
  }

  // Return the next closing time if available; otherwise, return the most recent closing time
  return upcomingClosingTime
    ? formatTime(upcomingClosingTime)
    : recentClosingTime
    ? formatTime(recentClosingTime)
    : '?';
}

export default getClosingTimeToday;