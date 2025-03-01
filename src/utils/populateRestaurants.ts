import axios from 'axios';
import shuffleArray from "@/utils/shuffleArray";


async function populateRestaurants(location) {
  let db = [];

  // Fetch restaurants
  async function fetchBusinesses(location, offset) {
    try {
      const response = await axios.get('/api/get-businesses', {
        params: { location, offset }
      });
      // Return restaurants
      return response.data.businesses;
    } catch (err) {
      console.error('Error fetching businesses:', err);
      return [];
    }
  }

  async function fetchAndStoreBusinesses() {
    try {
      const [businesses1, businesses2, businesses3, businesses4] = await Promise.all([
        fetchBusinesses(location, 0),
        fetchBusinesses(location, 50),
        fetchBusinesses(location, 100),
        fetchBusinesses(location, 150),
      ]);
      // Add all 4 results to one db
      db = businesses1.concat(businesses2).concat(businesses3).concat(businesses4);
      // Add additional properties
      db.forEach(business => {
        business.eliminated = false;
      });
      // Shuffle
      db = shuffleArray(db);
      return db;
    } catch (error) {
        console.error('Error fetching businesses:', error);
      return [];
    }
  }

  return fetchAndStoreBusinesses();
}

export default populateRestaurants;