import { cookies } from 'next/headers';
import createMember from '@/utils/createMember';

export async function POST(req) {
  const { partyID } = await req.json();

  if (!partyID) {
    return new Response(JSON.stringify({ message: 'Party ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Create member and get sessionID
    const sessionID = await createMember(partyID);

    // Set cookie
    const cookieStore = cookies();
    // Expires 1 hour from now
    const expires = new Date(Date.now() + 60 * 60 * 1000); 

    await cookieStore.set('sessionID', sessionID, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      path: '/',
      expires
    });

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

export async function handleRequest(req) {
  if (req.method === 'POST') {
    return POST(req);
  }

  return new Response(JSON.stringify({ message: 'Method Not Allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' },
  });
}

export default async function handler(req, res) {
  const response = await handleRequest(req);
  res.status(response.status).json(await response.json());
}