import { writeData, readData } from "@/utils/firebaseUtils";
import { v4 as uuidv4 } from 'uuid';


export function generateSessionId() {
  const uniqueId = uuidv4();
  const timestamp = Date.now();
  return `${uniqueId}-${timestamp}`;
}

/*
 * Creates a new party member and returns their sessionID
 */
export async function writeMember(partyID) {
  const sessionID = generateSessionId();

  try {
    // Get existing members 
    const party = await readData(`/${partyID}`);
    const existingMembers = party.members || [];
    // Add new member 
    const newMember = { id: sessionID };
    const updatedMembers = [...existingMembers, newMember];
    await writeData(`${partyID}/members`, updatedMembers);

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