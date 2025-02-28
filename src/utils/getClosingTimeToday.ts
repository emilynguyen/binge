import convertMilitaryTimeToStandard from "@/utils/convertMilitaryTimeToStandard";

const getClosingTimeToday = (business) => {
    const today = new Date().getDay();
    const hoursToday = business.business_hours[0].open.filter((hours) => hours.day === today);
  
    if (hoursToday.length === 0) {
      return null;
    }
  
    // Assuming the last entry for today is the closing time
    const closingTime = hoursToday[hoursToday.length - 1].end;
    return convertMilitaryTimeToStandard(closingTime);
  }

  export default getClosingTimeToday;