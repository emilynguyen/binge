import { getCookie, clearCookies } from '@/utils/cookieUtils';
import { removeData } from '@/utils/firebaseUtils';
import { deleteMemberMatches } from '@/utils/matchUtils';

/**
 * Remove the data of the given member
 * @param partyID 
 * @param sessionID 
 */
async function deleteMemberData(partyID, sessionID) {
  try {
    await removeData(`/${partyID}/members/${sessionID}`);
    await deleteMemberMatches(partyID, sessionID);
  } catch (err) {
    console.error(err);
  }
}

// todo handle case where party is already gone from db
export async function POST() {
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
    await deleteMemberData(partyID, sessionID);

    // Clear cookies
    await clearCookies();

    return new Response(JSON.stringify({ message: 'Member deleted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}