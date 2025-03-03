import { cookies } from 'next/headers';
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
    // Create member and get sessionID
    const sessionID = await writeMember(partyID);

    // Set cookie
    const cookieStore = await cookies();
    // Expires 1 hour from now
    const expires = new Date(Date.now() + 60 * 60 * 1000);

    // Store sessionID
    cookieStore.set('sessionID', sessionID, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      path: '/',
      expires,
    });

    // Store partyID
    cookieStore.set('partyID', partyID, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      path: '/',
      expires,
    });

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

export async function handler(req) {
  if (req.method === 'POST') {
    return POST(req);
  }

  return new Response(JSON.stringify({ message: 'Method Not Allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' },
  });
}