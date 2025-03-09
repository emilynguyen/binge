import { writeData, readData } from "@/utils/firebaseUtils";


/**
 * Check the matches array of the given business to see if it is a match for the whole party
 * @param {*} partyID 
 * @param {*} businessRef 
 * @param {*} businessIndex 
 * @returns 
 */
async function checkPartyMatch(partyID, businessRef, businessIndex) {
    try {
        const matchesRef =  await readData(`/${partyID}/businesses/${businessIndex}/matches`);

        const allMatchesTrue = Object.values(matchesRef).every(value => value === true);

        if (allMatchesTrue) {
            await writeData(`/${partyID}/businessMatch`, businessRef);
        }

    } catch {
        console.error('Error checking for a party match');
    }
}

/**
 * Called on a yes/no swipe to update the db
 * @param {*} partyID 
 * @param {*} sessionID 
 * @param {*} businessRef 
 * @param {*} decision boolean
 */
async function setMatch(partyID, sessionID, businessRef, decision) {
    try {
        const partyRef = await readData(`/${partyID}`);
        const businessIndex = partyRef.businesses.findIndex(business => business.id == businessRef.id
        );

        // If true, set matches[sessionID] = true
        if (decision == true) {
            await writeData(`/${partyID}/businesses/${businessIndex}/matches/${sessionID}`, true);
            // Check if this business is now a party match
            await checkPartyMatch(partyID, businessRef, businessIndex);
        }
    
        // If false, mark this business as eliminated and eliminations++
        if (decision == false) {
            await writeData(`/${partyID}/businesses/${businessIndex}/eliminated`, true);
            const eliminationCount = await readData(`/${partyID}/eliminationCount`);
            await writeData(`/${partyID}/eliminationCount`, eliminationCount + 1);
        }

    } catch {
        console.error('Error setting a match for user ' + sessionID);
    }
}


/**
 * Called when creating a new member to initialize their matches as false
 * @param {*} partyID 
 * @param {*} sessionID 
 */
async function initializeMemberMatches(partyID, sessionID) {
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

/**
 * Called when deleting a member to remove their match data
 * @param {*} partyID 
 * @param {*} sessionID 
 */
async function deleteMemberMatches(partyID, sessionID) {
    try {
        // Get the businesses in this party
        const businessesRef = await readData(`/${partyID}/businesses`);

        // For each business set matches[sessionID] = false
        for (let key in businessesRef) {
            const business = businessesRef[key];
            const { [sessionID]: undefined, ...rest } = business.matches;
            business.matches = rest;
        }


        await writeData(`/${partyID}/businesses`, businessesRef);
    } catch {
        console.error('Error deleting matches for user ' + sessionID);
    }
}

async function resetMatches(partyID) {
    try {
        // Get the businesses in this party
        const partyRef = await readData(`/${partyID}`);
        const businessesRef = partyRef.businesses;

        // Reset elimination count
        partyRef.eliminationCount = 0;

        // Reset matches
        for (let businessKey in businessesRef) {
            const business = businessesRef[businessKey];
            business.eliminated = false;
          
            for (let memberKey in business.matches) {
                business.matches[memberKey] = false;
            }
        }

        await writeData(`/${partyID}`, partyRef);
    } catch {
        console.error('Error resetting matches for party ' + partyID);
    }
}

export { initializeMemberMatches, deleteMemberMatches, setMatch, resetMatches } ;