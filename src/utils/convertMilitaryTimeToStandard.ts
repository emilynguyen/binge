
  const convertMilitaryTimeToStandard = (time) =>  {
    if (!/^\d{4}$/.test(time)) {
      throw new Error('Invalid time format. Please provide a 4-digit time string.');
    }
  
    let hours = parseInt(time.substring(0, 2), 10);
    const minutes = time.substring(2);
  
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 to 12 for midnight and adjust hours for PM
  
    if (minutes === '00') {
      return `${hours}${period}`;
    }
  
    return `${hours}:${minutes}${period}`;
  }

  export default convertMilitaryTimeToStandard;