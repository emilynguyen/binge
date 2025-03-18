
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const coords = searchParams.get('coords').replace(/\s/g, '');
  const API_KEY = process.env.HERE_API_KEY;


  console.log(`Reverse geocoding ${coords}`);

  if (!coords) {
    return NextResponse.json({ error: 'Coordinates are required' }, { status: 400 });
  }

  const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${encodeURIComponent(coords)}&lang=en-US&apiKey=${API_KEY}`;



  try {
    const res = await fetch(url);
    const data = await res.json();


    if (data.items && data.items.length > 0) {
      const address = data.items[0].title;

      console.log(address);

      return NextResponse.json(address, { status: 200 });
    } else {
      return NextResponse.json({ error: 'No results found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching geocode data:', error);
    return NextResponse.json({ error: 'Failed to fetch geocode data' }, { status: 500 });
  }
}
