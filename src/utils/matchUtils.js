import { writeData, readData } from "@/utils/firebaseUtils";

/*
async function getPartyIDBySessionID(sessionID) {
    const db = await readData(`/`);

    for (let party in db) {
      const members = party.members;
  
      for (let member in members) {
        if (sessionID == member.id)
          return party;
      }
    }
    return null;
  } */

    /*
async function setMatch(partyID, sessionID, decision) {
    // If true, set matches[sessionID] = true
    // If false, mark this business as eliminated
    try {
        // Get the businesses in this party
        const businessesRef = await readData(`/${partyID}/businesses`);

        // For each business set matches[sessionID] = false
        for (let key in businessesRef) {
            const business = businessesRef[key];
            business.matches = { ...business.matches, [sessionID]: false };
        }

        await writeData(`/${partyID}/businesses`, businessesRef);
    } catch {
        console.error('Error initializing matches for user ' + sessionID);
    }
}
*/

/**
 * Called when creating a new member to initialize their matches as false
 * @param {*} partyID 
 * @param {*} sessionID 
 */
async function initializeMatches(partyID, sessionID) {
    try {
        // Get the businesses in this party
        const businessesRef = await readData(`/${partyID}/businesses`);

        // For each business set matches[sessionID] = false
        for (let key in businessesRef) {
            const business = businessesRef[key];
            business.matches = { ...business.matches, [sessionID]: false };
        }

        await writeData(`/${partyID}/businesses`, businessesRef);
    } catch {
        console.error('Error initializing matches for user ' + sessionID);
    }
}

export { initializeMatches } ;