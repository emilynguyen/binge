import { writeData } from "@/utils/firebaseUtils";
import generateUniquePartyID from "@/utils/generatePartyID";
import getBusinessesFromYelp from "@/utils/getBusinessesFromYelp";

import axios from 'axios';

/**
 * Create a new party, add its first member, and populate businesses
 * @param location 
 * @returns partyID of new party
 */
async function createParty(locationName, locationCoords) {
    try {        
        // Generate unique party ID
        const partyID = await generateUniquePartyID();
        if (!partyID) {
           throw "Server is full, please try again later"
        }
        
        
        const businesses = await getBusinessesFromYelp(locationCoords, 20);

        if (!businesses) {
            throw "Yelp returned no businesses for this location";
        }

        // Add party to db
        await writeData(partyID, { 
            'timestamp' : Date.now(), 
            'location' : {
                name: locationName,
                coords: locationCoords
            },
            'isStarted' : false,
            'members' : [],
            'eliminationCount' : 0,
            'businessMatch': null,
            'businesses' : businesses
        });
        console.log("Created new party: " + partyID);
        
        
        // Add party creator as first member
        await axios.post('/api/create-member', { partyID: partyID });
        
        return partyID;
 
    } catch (err) {
        console.error(err);
        throw err;
        //return null;
    } 
}

export default createParty;