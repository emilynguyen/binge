import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Set your Google Maps Geocoding API key here
const API_KEY = process.env.GOOGLE_MAPS_API_KEY;


export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  

  if (!lat || !lng) {
    return NextResponse.json({ error: 'Latitude and longitude are required' }, { status: 400 });
  }

  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === 'OK') {
      const address = response.data.results[0].formatted_address;
      return NextResponse.json({ address });
    } else {
      throw new Error(`Geocoding API error: ${response.data.status}`);
    }
  } catch (err) {
    console.error('Error reverse geocoding:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}