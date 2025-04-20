import axios from 'axios';

/**
 * Retrieve a specified number of places in the given location using Foursquare Places API
 * @param location - The coords to search for places
 * @param num - The number of places to return
 * @returns array containing places
 */
async function getPlacesFromFoursquare(location, num) {
  if (!location) {
    throw "Invalid address, try again";
  }

  let places = [];
  const limit = 50; // Foursquare API returns up to 50 results per request
  const iterations = Math.ceil(num / limit);

  // Fetch places
  async function fetchPlaces(location, offset) {
    try {
      const response = await axios.get('/api/foursquare-search', {
        params: { ll: location, limit, offset },
      });
      // Return places
      return response.data.results;
    } catch (error) {
      console.error('Error fetching places from Foursquare API:', error);
      throw "Foursquare returned no places for this address";
    }
  }

  try {
    // Fetch places in parallel, in chunks of `limit`
    const promises = [];
    for (let i = 0; i < iterations; i++) {
      promises.push(fetchPlaces(location, i * limit));
    }

    const results = await Promise.all(promises);
    places = results.flat().slice(0, num);

    // Add additional properties and fetch details
    for (const place of places) {
      place.eliminated = false; 
      try {
        const details = await getPlaceDetails(place.fsq_id);
        place.details = details;
      } catch {
        throw `Error getting details for ${place.name}`;
      }
    }

    return places;
  } catch (error) {
    console.error('Error fetching places:', error);
    throw "Foursquare returned no places for this address";
  }
}

async function getPlaceDetails(fsq_id) {

  try {
    const response = await axios.get('/api/fsq-get-place-details', {
      params: { 
        fsq_id: fsq_id
      },
    });
    // Return place details
    return response.data;
  } catch (error) {
    console.error('Error fetching place details from Foursquare API:', error);
    throw "Foursquare returned no details for this place";
  }

}

export default getPlacesFromFoursquare;