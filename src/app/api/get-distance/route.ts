export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const origin = searchParams.get('origin');
  const destination = searchParams.get('destination');
  const API_KEY = process.env.GOOGLE_MAPS_API_KEY;


  if (!origin || !destination) {
    return new Response(JSON.stringify({ error: 'Invalid parameters' }), { status: 400 });
  }

  const fetchDistanceMatrix = async (mode) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&mode=${mode}&key=${API_KEY}`
    );
    const data = await response.json();
    if (data.rows[0].elements[0].status === 'ZERO_RESULTS') {
      return 'N/A';
    }

    // Replace mins with min
    const duration = data.rows[0].elements[0].duration.text.replace('mins', 'min');

     // Check if the duration is greater than 1 hour
     if (duration.includes('hour') || duration.includes('hours')) {
      return '> 1 hr';
    }

    return duration;
  };

  try {
    const [walk, car, train] = await Promise.all([
      fetchDistanceMatrix('walking'),
      fetchDistanceMatrix('driving'),
      fetchDistanceMatrix('transit'),
    ]);
    return new Response(JSON.stringify({ walk, car, train }), { status: 200 });
  } catch (error) {
    console.error('Failed to fetch distance matrix data:', error);
    return new Response(JSON.stringify({ error: '? min' }), { status: 500 });
  }
}