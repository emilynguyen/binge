import axios from 'axios';
import { NextResponse } from 'next/server';

/**
 * Get the current local time in Foursquare's `open_at` format (DOWTHHMM).
 * DOW: Day of the week (1-7, Monday = 1, Sunday = 7)
 * THHMM: Time in 24-hour format
 *
 * @returns {string} The current local time in `open_at` format (e.g., "7T0102").
 */
function getCurrentTime() {
  const currentDate = new Date();

  // Map day of the week to Foursquare's format (1-7, where Monday = 1, Sunday = 7)
  const dow = currentDate.getDay() === 0 ? 7 : currentDate.getDay(); // Use `getDay` for local day of the week

  // Format local time into THHMM (24-hour format)
  const hours = currentDate.getHours().toString().padStart(2, '0'); // Use `getHours` for local time
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const time = `T${hours}${minutes}`;

  // Combine day of the week and time into `open_at` format
  return `${dow}${time}`;
}


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
  const ll = searchParams.get('ll');
  const limit = searchParams.get('limit') || 50;
  const offset = searchParams.get('offset') || 0;
  const radius = 12874;
  const categories = "13065"; // ID for restaurants
  const open_at = getCurrentTime();

  if (!ll) {
    return NextResponse.json({ message: 'Near parameter is required' }, { status: 400 });
  }

  const options = {
    method: 'GET',
    url: 'https://api.foursquare.com/v3/places/search',
    headers: {
      accept: 'application/json',
      authorization: API_KEY,
    },
    params: {
      ll,
      categories,
      limit,
      offset,
      radius,
      open_at,
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