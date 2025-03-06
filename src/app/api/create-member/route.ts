import { setCookie } from '@/utils/cookieUtils';
import writeMember from '@/utils/writeMember';

export async function POST(req) {
  const { partyID } = await req.json();

  console.log('Creating new member...');

  if (!partyID) {
    return new Response(JSON.stringify({ message: 'Party ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Create member and get their sessionID
    const sessionID = await writeMember(partyID);

    // Set cookies
    await setCookie('sessionID', sessionID);
    await setCookie('partyID', partyID);

    console.log('Cookies set for new member');


    return new Response(JSON.stringify({ sessionID }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating member', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}