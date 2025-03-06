import { getCookie } from '@/utils/cookieUtils';


// To use:
// import axios from 'axios';
// await axios.post('/api/get-sessionID');
export async function POST() {
    try {
        // Get cookie
        const sessionID = await getCookie('sessionID');

        if (sessionID)
            return sessionID;
        else return null;

    } catch {
        console.log('Error getting session ID from cookies');
    }
}