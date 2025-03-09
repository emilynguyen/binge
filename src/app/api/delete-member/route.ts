import { getCookie, clearCookies } from '@/utils/cookieUtils';
import { readData, writeData } from '@/utils/firebaseUtils';
import { deleteMemberMatches } from '@/utils/matchUtils';


async function deleteMemberFromDb(partyID, sessionID) {
  // Get current members
  const membersData = await readData(`${partyID}/members`);
  const members = membersData ? Object.values(membersData) : [];

  if (members.length > 0) {
    // Filter out the member to delete
    const updatedMembers = members.filter((member) => member.id !== sessionID);

    // Remove their matches
    await deleteMemberMatches(partyID, sessionID);

    // Update the database
    await writeData(`${partyID}/members`, updatedMembers);
    console.log("Member deleted successfully");
  } else {
    throw new Error("Party not found or no members to delete");
  }
}


// handle case where party is already gone from db
export async function POST() {
  console.log('Deleting member...');
  const sessionID = await getCookie('sessionID');
  const partyID = await getCookie('partyID');

 console.log('Deleting member ' + sessionID + "...");

  if (!partyID || !sessionID) {
    return new Response(JSON.stringify({ message: 'Party ID is required to delete member' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Delete member data
    await deleteMemberFromDb(partyID, sessionID);


    // Clear cookies
    await clearCookies();


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