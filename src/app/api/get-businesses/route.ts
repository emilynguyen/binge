import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
  const API_KEY = process.env.YELP_API_KEY;

  if (!API_KEY) {
    return NextResponse.json({ message: 'YELP_API_KEY is not set in environment variables' }, { status: 500 });
  }



  const options = {
    method: 'GET',
    url: 'https://api.yelp.com/v3/businesses/search',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${API_KEY}`
    },
    params: {
      location: 'Oakland, CA',
      term: 'restaurants',
      radius: 16093,
      sort_by: 'best_match',
      limit: 50,
      open_now: true
    }
  };

  try {
    const response = await axios.request(options);
    return NextResponse.json(response.data, { status: 200 });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
    console.error(errorMessage);
    return NextResponse.json({ message: 'Error fetching data from Yelp', error: errorMessage }, { status: 500 });
  }
}