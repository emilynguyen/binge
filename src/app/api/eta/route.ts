// pages/api/distance.js

import { NextResponse } from "next/server";

// Function to get the difference in minutes
function getTimeDifferenceInMinutes(arrivalTime) {
  // Get the current time in ISO 8601 format (UTC)
  const currentTime = new Date();

  // Parse the arrival time string into a Date object
  const arrivalDate = new Date(arrivalTime);

  // Calculate the difference in milliseconds
  const timeDifference = arrivalDate - currentTime;

  // Convert the difference from milliseconds to minutes
  const differenceInMinutes = Math.floor(timeDifference / 1000 / 60);

  // Return the difference in minutes (could be positive or negative)
  return differenceInMinutes;
}



export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const origin = searchParams.get('origin').replace(/\s/g, '');
  const destination = searchParams.get('destination').replace(/\s/g, '');
  const API_KEY = process.env.HERE_API_KEY;

  if (!origin || !destination) {
    return NextResponse.json({ error: 'N/A' }, { status: 400 });
  }

  // Get current date and time in ISO 8601 format (UTC)
  const now = new Date().toISOString();

  const fetchDistanceMatrix = async (mode) => {
    const url = `https://router.hereapi.com/v8/routes?apiKey=${API_KEY}&departureTime=${now}&origin=${origin}&destination=${destination}&transportMode=${mode}`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (!data.routes || data.routes.length === 0) {
      return '...';
    }

    const arrivalTime = data.routes[0].sections[0].arrival.time;
    const eta = getTimeDifferenceInMinutes(arrivalTime);

    // Check if the duration is greater than 1 hour
    if (eta > 60) {
      return '> 1 hr';
    }

    return eta + " min";
  };

  try {
    const [walk, car] = await Promise.all([
      fetchDistanceMatrix('pedestrian'),
      fetchDistanceMatrix('car'),
    ]);

    return NextResponse.json({ walk, car }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch distance matrix data:', error);
    return NextResponse.json({ error: '? min' }, { status: 500 });
  }
}
