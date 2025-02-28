import axios from 'axios';

// Set your Google Maps Geocoding API key here
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

/**
 * Reverse geocode coordinates to get the address.
 * @param {number} lat - Latitude of the location.
 * @param {number} lng - Longitude of the location.
 * @returns {Promise<string>} - The address corresponding to the coordinates.
 */
async function reverseGeocode(lat, lng) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === 'OK') {
      const address = response.data.results[0].formatted_address;
      return address;
    } else {
      throw new Error(`Geocoding API error: ${response.data.status}`);
    }
  } catch (error) {
    console.error('Error reverse geocoding:', error.message);
    throw error;
  }
}

export default reverseGeocode;