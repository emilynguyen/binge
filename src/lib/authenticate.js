import { readData } from '@/utils/firebaseUtils';
import { cookies } from 'next/headers';

function getMembersParty(db, sessionID) {
  for (let party in db) {
    const members = party.members;

    for (let member in members) {
      if (sessionID == member.id)
        return party;
    }
  }
  return null;
}

// Middleware to authenticate requests
export async function authenticate() {
  const cookieStore = cookies();
  const sessionID = cookieStore.get('sessionID')?.value;

  // Check for sessionID in cookies
  if (!sessionID) {
    return { isAuthenticated: false };
  }

  // Check for sessionID in db
  try {
    const db = await readData('/');
    const party = getMembersParty(db, sessionID);

    if (!party) {
      return { isAuthenticated: false };
    }

    return { isAuthenticated: true, user: { id: sessionID } };
  } catch (err) {
    console.log(err);
    return { isAuthenticated: false };
  }
}