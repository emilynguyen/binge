import { getCookie, deleteCookie } from '@/utils/cookieUtils';

import deleteMember from '@/utils/deleteMember';

export async function POST() {
  const sessionID = await getCookie('sessionID');
  const partyID = await getCookie('partyID');

 console.log('Deleting member ' + sessionID + "...");

  if (!partyID || !sessionID) {
    return new Response(JSON.stringify({ message: 'Party ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Delete member
    await deleteMember(partyID, sessionID);

    // Clear cookies
    await deleteCookie('sessionID');
    await deleteCookie('partyID');


    return new Response(JSON.stringify({ message: 'Member deleted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error deleting member', error);
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