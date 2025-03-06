import { readData } from "@/utils/firebaseUtils";

async function getBusinesses(partyID) {
    try {
        return await readData(`/${partyID}/businesses`);
    } catch {
        console.error('Error getting businesses from db');
    }
}

export default getBusinesses;