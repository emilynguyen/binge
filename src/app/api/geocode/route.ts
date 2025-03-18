
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get('address');
  const API_KEY = process.env.HERE_API_KEY;

  console.log(`Geocoding ${address}`);

  if (!address) {
    return NextResponse.json({ error: 'Address is required' }, { status: 400 });
  }

  const url = `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(address)}&apiKey=${API_KEY}`;

 // const url = `https://geocoder.ls.hereapi.com/6.2/geocode.xml?apiKey=${API_KEY}&searchtext=${encodeURIComponent(address)}`;


  try {
    const res = await fetch(url);
    const data = await res.json();


    if (data.items && data.items.length > 0) {

      const lat = data.items[0].position.lat;
      const lng = data.items[0].position.lng;
      const coordinates = lat + "," + lng;

      return NextResponse.json(coordinates, { status: 200 });
    } else {
      return NextResponse.json({ error: 'No results found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching geocode data:', error);
    return NextResponse.json({ error: 'Failed to fetch geocode data' }, { status: 500 });
  }
}
