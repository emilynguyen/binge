import { writeData, readData } from "@/utils/firebaseUtils";
import { v4 as uuidv4 } from 'uuid';
import { initializeMemberMatches } from "@/utils/matchUtils";


/**
 * Generates a unique sessionID using uuid and timestamp
 * @returns unique sessionID
 */
export function generateSessionID() {
  const uniqueID = uuidv4();
  const timestamp = Date.now();
  return `${uniqueID}-${timestamp}`;
}

/**
 * Writes a new member to the db and sets their match in businesses to false
 * @param partyID party to create new member in
 * @returns sessionID of new member
 */
export async function writeMember(partyID) {
  const sessionID = generateSessionID();

  try {
    // Get existing members 
    const party = await readData(`/${partyID}`);
    const existingMembers = party.members || [];

    // Add new member 
    const newMember = { id: sessionID };
    const updatedMembers = [...existingMembers, newMember];
    await writeData(`${partyID}/members`, updatedMembers);

    // Set their matches to false
    /*
    const businessesRef = await readData(`/${partyID}/businesses`);
    // For each business set matches[sessionID] = false
    for (let key in businessesRef) {
      const business = businessesRef[key];
      business.matches = { ...business.matches, [sessionID]: false };
    } */

    await initializeMemberMatches(partyID, sessionID);
  

    // Read the data again after writing
    //const updatedDb = await readData("/");
    //console.log(updatedDb);

    return sessionID;
  } catch (err) {
    console.log("Error writing member");
    throw err;
  }
}

export default writeMember;