import axios from 'axios';

/**
 * Retrieve 200 businesses in the given location using Yelp Fusion
 * @param location 
 * @returns array containing businesses
 */
async function getBusinessesFromYelp(location) {
  let restaurants = [];

  // Fetch restaurants
  async function fetchBusinesses(location, offset) {
    try {
      const response = await axios.get('/api/yelp-search', {
        params: { location, offset }
      });
      // Return restaurants
      return response.data.businesses;
    } catch (err) {
      console.error('Error fetching businesses:', err);
      return [];
    }
  }


  try {
    const [businesses1, businesses2, businesses3, businesses4] = await Promise.all([
      fetchBusinesses(location, 0),
      fetchBusinesses(location, 50),
      fetchBusinesses(location, 100),
      fetchBusinesses(location, 150),
    ]);
    // Add all 4 results to one db
   // restaurants = businesses1.concat(businesses2).concat(businesses3).concat(businesses4);
   restaurants = businesses1;
    // Add additional properties
    restaurants.forEach(business => {
      business.eliminated = false;
    });

    return restaurants;
  } catch (error) {
      console.error('Error fetching businesses:', error);
    return [];
  }

}

export default getBusinessesFromYelp;