import { cookies } from 'next/headers';
import deleteMember from '@/utils/deleteMember';

export async function POST() {
  console.log('Deleting member...');
  const cookieStore = await cookies();
  const sessionID = cookieStore.get('sessionID')?.value;
  const partyID = cookieStore.get('partyID')?.value;


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
    cookieStore.delete('sessionID');
    cookieStore.delete('partyID');

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