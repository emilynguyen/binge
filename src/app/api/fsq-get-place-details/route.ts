import axios from 'axios';
import { NextResponse } from 'next/server';

/**
 * API call to Foursquare Places API
 * @param request
 * @returns search response
 */
export async function GET(request) {
  const API_KEY = process.env.FOURSQUARE_API_KEY;

  if (!API_KEY) {
    return NextResponse.json({ message: 'FOURSQUARE_API_KEY is not set in environment variables' }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const fsq_id = searchParams.get('fsq_id');

  console.log('Getting details for ' + fsq_id);

    // Properly encode the `fields` parameter
   // const fields = encodeURIComponent('categories,hours,rating,price,distance,photos,features');
    const fields = 'hours%2Crating%2Cprice%2Cdistance%2Cphotos%2Cfeatures';
/*
    const fields = ['categories', 'hours', 'rating', 'price', 'distance', 'photos', 'features']
    .map(encodeURIComponent)
    .join('%2C'); */

    const options = {
        method: 'GET',
        url: `https://api.foursquare.com/v3/places/${fsq_id}?fields=${fields}`, // URL with encoded `fields`
        headers: {
            accept: 'application/json',
            authorization: API_KEY, // Use API key directly without `Bearer`
        },
    };

  try {
    const response = await axios.request(options);
    return NextResponse.json(response.data, { status: 200 });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
    console.error(errorMessage);
    return NextResponse.json({ message: 'Error fetching data from Foursquare', error: errorMessage }, { status: 500 });
  }
}