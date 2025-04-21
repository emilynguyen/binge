/**
 * Get the next closing time for a business today.
 * Assumes the business is currently open.
 *
 * @param {Array} periods - The array of periods, where each period contains "open" and "close" objects with "day" and "time".
 * @returns {string} The next closing time in "h:mmA" format (e.g., "11:30PM"), or "hA" format (e.g., "9PM").
 */
function getClosingTimeToday(periods) {
  if (!periods || periods.length === 0) return null;

  try {
    const now = new Date();
    const currentDay = now.getUTCDay(); // Day of the week (0 for Sunday through 6 for Saturday)
    const currentTime = parseInt(
      `${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}`
    ); // Current time as an integer (e.g., 0604)

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

    // Find the next closing time for the current day
    for (const period of periods) {
      const closeDay = period.close.day;
      const closeTime = parseInt(period.close.time);

      // If the closing time is today and in the future, return it
      if (closeDay === currentDay && closeTime > currentTime) {
        return formatTime(closeTime);
      }
    }

    // If no valid closing time is found, return null (this shouldn't happen if the place is open)
    return null;

  } catch {
    return null;
  }

}

export default getClosingTimeToday;