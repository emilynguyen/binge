import axios from 'axios';
import { NextResponse } from 'next/server';

/**
 * API call to Google Maps Place Photos API
 * @param request
 * @returns Photo response or error
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
  const photo_ref = searchParams.get('photo_ref'); // Get the Google photo reference from query parameters
  const maxheight = 600; 

  if (!photo_ref) {
    return NextResponse.json(
      { message: 'photo_ref parameter is required' },
      { status: 400 }
    );
  }


  const options = {
    method: 'GET',
    url: `https://maps.googleapis.com/maps/api/place/photo`,
    params: {
      photoreference: photo_ref,
      maxheight, // Maximum width of the photo
      key: API_KEY, // Google Maps API Key
    },
    responseType: 'stream', // Ensure the response is treated as a stream (image data)
  };

  try {
    const response = await axios.request(options);

    // Stream the image back to the client
    return new NextResponse(response.data, {
      status: response.status,
      headers: {
        'Content-Type': response.headers['content-type'],
      },
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
    console.error('Error fetching photo:', errorMessage);
    return NextResponse.json(
      { message: 'Error fetching photo from Google Maps Place Photos API', error: errorMessage },
      { status: 500 }
    );
  }
}