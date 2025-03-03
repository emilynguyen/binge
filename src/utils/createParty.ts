import { writeData, readData } from "@/utils/firebaseUtils";
import generatePartyID from "@/utils/generatePartyID";
import axios from 'axios';


async function createParty() {
    try {
        const db = await readData("/");
        let uniqueID = false;

        while (!uniqueID) {
            // Generate unique party ID
            const partyID = generatePartyID();

            // Use partyID if it isn't already in use or if db is empty
            if (!db || !db[partyID]) {
                // Add party to db
                await writeData(partyID, { 
                    'timestamp' : Date.now(), 
                    'isClosed' : false, 
                    'isStarted' : false,
                    'members' : []
                });
                console.log("Added new party: " + partyID);
                
                // Add creator as first member
                await axios.post('/api/create-member', { partyID: partyID });
               
                uniqueID = true;
                return partyID;
            } else {
                //console.log("Party ID already in use: " + partyID);
            }
        }
    } catch (err) {
        console.log("Error reading or writing data: ", err);
    }

    // Populate DB
    return null;
  
}

export default createParty;