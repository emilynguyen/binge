import { setCookie } from '@/utils/cookieUtils';
import { pushData } from "@/utils/firebaseUtils";
import { initializeMemberMatches } from "@/utils/matchUtils";

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
    const sessionID = await pushData(`/${partyID}/members`, { viewed: false })

    // Initialize matches
    await initializeMemberMatches(partyID, sessionID);

    // Set cookies
    await setCookie('sessionID', sessionID);
    await setCookie('partyID', partyID);

    console.log('Cookies set for new member');


    return new Response(JSON.stringify({ sessionID }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error creating member', err);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}