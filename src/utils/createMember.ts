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
export async function createMember(partyID) {
  const sessionID = generateSessionId();

  try {
    // Write to db
    await writeData(`${partyID}/members`, { 'id': sessionID });

    // Read the data again after writing
    const updatedDb = await readData("/");
    console.log(updatedDb);

    return sessionID;
  } catch (err) {
    console.log("Error writing member");
    throw err;
  }
}

export default createMember;