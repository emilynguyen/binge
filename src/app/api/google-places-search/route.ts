import axios from 'axios';
import { NextResponse } from 'next/server';


/**
 * API call to Google Maps Places API Text Search
 * @param request
 * @returns search response
 */
export async function GET(request) {
  const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

  if (!API_KEY) {
    return NextResponse.json(
      { message: 'GOOGLE_MAPS_API_KEY is not set in environment variables' },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const ll = searchParams.get('ll'); // Latitude and longitude in "lat,lng" format
  const limit = 20; // Max results (Google API defaults to 20)
  const radius = 8046; // Search radius in meters (default: 5 km)
  //const query = 'restaurant'; 
  const type = 'restaurant';
  const openNow = true;

  if (!ll) {
    return NextResponse.json({ message: 'll (latitude,longitude) parameter is required' }, { status: 400 });
  }

  const options = {
    method: 'GET',
    url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
    params: {
      location: ll, // Latitude and longitude
      radius, // Search radius (in meters)
      key: API_KEY,
      opennow: openNow,
      type: type, // Restrict results to restaurants
    },
    headers: {
      accept: 'application/json',
    },
  };

  try {
    const response = await axios.request(options);
    const results = response.data.results.slice(0, limit); // Limit results to the specified number
    return NextResponse.json({ results }, { status: 200 });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
    console.error(errorMessage);
    return NextResponse.json(
      { message: 'Error fetching data from Google Maps Places API', error: errorMessage },
      { status: 500 }
    );
  }
}