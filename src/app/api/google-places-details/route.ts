import axios from 'axios';
import { NextResponse } from 'next/server';

/**
 * API call to Google Maps Place Details API
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
  const place_id = searchParams.get('place_id'); // Get the Google Place ID from query parameters

  if (!place_id) {
    return NextResponse.json(
      { message: 'place_id parameter is required' },
      { status: 400 }
    );
  }

  // Correct field names based on the documentation
  
  const fields = [
    'type',
    'formatted_address',
    'address_component', 
    'opening_hours',
    'photos'
  ].join(','); 

  //const fields = "";

  console.log('Getting details for place_id: ' + place_id);

  const options = {
    method: 'GET',
    url: `https://maps.googleapis.com/maps/api/place/details/json`,
    params: {
      place_id, // Place ID of the location
      fields: fields,
      key: API_KEY, // Google Maps API Key
    },
    headers: {
      accept: 'application/json',
    },
  };

  try {
    const response = await axios.request(options);
    return NextResponse.json(response.data.result, { status: 200 }); // Return the detailed place information
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
    console.error(errorMessage);
    return NextResponse.json(
      { message: 'Error fetching data from Google Maps Place Details API', error: errorMessage },
      { status: 500 }
    );
  }
}