import { readData } from '@/utils/firebaseUtils';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const partyID = searchParams.get('partyID');

  console.log('Getting party ' + partyID);

  if (!partyID) {
    return new Response(JSON.stringify({ error: 'Party ID is required' }), { status: 400 });
  }

  try {
    const party = await readData(`/${partyID}`);
    
    if (party) {
      console.log('Party found!');
      return new Response(JSON.stringify({ partyID, party }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: 'Party not found' }), { status: 404 });
    }
  } catch {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}