import axios from 'axios';

/**
 * Retrieve a specified number of businesses in the given location using Yelp Fusion
 * @param location
 * @param num - The number of businesses to return
 * @returns array containing businesses
 */
async function getBusinessesFromYelp(location, num) {
  let restaurants = [];
  const limit = 50; // Yelp API returns up to 50 results per request
  const iterations = Math.ceil(num / limit);

  // Fetch businesses
  async function fetchBusinesses(location, offset) {
    try {
      const response = await axios.get('/api/yelp-search', {
        params: { location, offset, limit }
      });
      // Return businesses
      return response.data.businesses;
    } catch (err) {
      console.error('Error fetching businesses:', err);
      return null;
    }
  }

  try {
    // Fetch businesses in parallel, in chunks of `limit`
    const promises = [];
    for (let i = 0; i < iterations; i++) {
      promises.push(fetchBusinesses(location, i * limit));
    }

    const results = await Promise.all(promises);
    restaurants = results.flat().slice(0, num);

    // Add additional properties
    restaurants.forEach(business => {
      business.eliminated = false;
    });

    return restaurants;
  } catch (error) {
    console.error('Error fetching businesses:', error);
    return null;
  }
}

export default getBusinessesFromYelp;