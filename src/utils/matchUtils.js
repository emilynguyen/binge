import { writeData, readData, pushData } from "@/utils/firebaseUtils";


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

        // If yes, set matches[sessionID] = true
        if (decision == true) {
            await writeData(`/${partyID}/businesses/${businessIndex}/matches/${sessionID}`, true);
            // Check if this business is now a party match
            await checkPartyMatch(partyID, businessRef, businessIndex);
        }
    
        // If no, mark this business as eliminated and eliminations++ (if it isn't already)
        if (decision == false && !partyRef.businesses[businessIndex].eliminated) {
            await writeData(`/${partyID}/businesses/${businessIndex}/eliminated`, true);
            const eliminationCount = await readData(`/${partyID}/eliminationCount`);
            await writeData(`/${partyID}/eliminationCount`, eliminationCount + 1);
        }

        // Mark this card as viewed
        await pushData(`/${partyID}/members/${sessionID}/viewed`, { name: businessRef.name }, businessRef.id);

        console.log(businessRef.name + " marked as viewed");

    } catch (err) {
        console.error(err);
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
    } catch (err) {
        console.error(err);
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
    } catch (err) {
        console.error(err);
    }
}

async function resetMatches(partyID) {
    try {
        // Get the businesses in this party
        const partyRef = await readData(`/${partyID}`);
        const businessesRef = partyRef.businesses;

        // Reset elimination count and match
        partyRef.eliminationCount = 0;
        partyRef.businessMatch = null;

        // Reset matches
        for (let businessKey in businessesRef) {
            const business = businessesRef[businessKey];
            business.eliminated = false;
          
            for (let memberKey in business.matches) {
                business.matches[memberKey] = false;
            }
        }

        // Reset viewed cards
        for (let memberKey in partyRef.members) {
            partyRef.members[memberKey].viewed = false;
        }

        await writeData(`/${partyID}`, partyRef);
    } catch (err) {
        console.error(err);
    }
}

export { initializeMemberMatches, deleteMemberMatches, setMatch, resetMatches } ;