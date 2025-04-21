import axios from 'axios';

/**
 * Retrieve a specified number of places in the given location using the Google Places API
 * @param {string} location - The coords to search for places (e.g., "37.7749,-122.4194")
 * @param {number} num - The number of places to return
 * @returns {Promise<Array>} Array containing places
 */
async function getPlacesFromGoogle(location, num) {
  if (!location) {
    throw "Invalid address, try again";
  }

  const limit = 20; // Google Places API returns up to 20 results per request
  const iterations = Math.ceil(num / limit);
  let places = [];

  // Fetch places
  async function fetchPlaces(location, offset) {
    try {
      const response = await axios.get('/api/google-places-search', {
        params: {
          ll: location,
          limit,
          offset,
        },
      });
      // Return places
      return response.data.results;
    } catch (error) {
      console.error('Error fetching places from Google Maps Places API:', error);
      throw "Google Maps API returned no places for this address";
    }
  }

  // Fetch place details
  async function fetchPlaceDetails(placeId) {
    try {
      const response = await axios.get('/api/google-places-details', {
        params: {
          place_id: placeId,
        },
      });
      // Return place details
      return response.data;
    } catch (error) {
      console.error(`Error fetching details for place_id ${placeId}:`, error);
      throw `Google Maps API returned no details for place_id: ${placeId}`;
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

    // Fetch details for each place and store it in `place.details`
    for (const place of places) {
      try {
        // Fetch details
        const details = await fetchPlaceDetails(place.place_id);
        place.details = details;
        // Set photo
        place.img_url = `api/google-places-photo?photo_ref=${place.photos[0].photo_reference}&maxheight=600`;
        // Initialize elimination tracker
        place.eliminated = false;
      } catch {
        throw `Failed to fetch details for place: ${place.name}`;
      }
    }

    return places;
  } catch (error) {
    console.error('Error fetching places:', error);
    throw "Google Maps API failed to fetch data";
  }
}

export default getPlacesFromGoogle;