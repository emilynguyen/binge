import { writeData } from "@/utils/firebaseUtils";
import generateUniquePartyID from "@/utils/generatePartyID";
import getBusinessesFromYelp from "@/utils/getBusinessesFromYelp";

import axios from 'axios';

/**
 * Create a new party, add its first member, and populate businesses
 * @param location 
 * @returns partyID of new party
 */
async function createParty(location) {
    console.log('Creating new party in location: ' + location);
    try {        
        // Generate unique party ID
        const partyID = await generateUniquePartyID();

        // Add party to db
        await writeData(partyID, { 
            'timestamp' : Date.now(), 
            'location' : location,
            'isStarted' : false,
            'members' : [],
            'eliminationCount' : 0,
            'businessMatch': null,
            'businesses' : await getBusinessesFromYelp(location, 10)
        });
        console.log("Created new party: " + partyID);
        
        // Add party creator as first member
        await axios.post('/api/create-member', { partyID: partyID });
        
        return partyID;
 
    } catch {
        console.log("Error creating party");
        return null;
    }
}

export default createParty;