import { useState } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';
import Form from 'next/form'
import axios from 'axios';
import { readData } from '@/utils/firebaseUtils';

import Button from '@/components/ui/Button';
import Error from '@/components/ui/Error';



const JoinPartyForm = ({  }) => {
    const [joinError, setJoinError] = useState(null);
    const router = useRouter();


    /*
    * Handle joining a party
    */
    async function handleJoin(e) {
        e.preventDefault();
        const partyID = e.target.partyID.value;
        
        setJoinError(null);
    
        try {
        // Check that party exists
        const partyRef = await readData(`/${partyID}`);
        if (!partyRef) {
            setJoinError('Party not found');
            return;
        }
        // Check that party is still open
        if (partyRef.isStarted) {
            setJoinError('This party is closed');
            return;
        }
        if (router) {
            
            // Create member
            await axios.post('/api/create-member', { partyID: partyID });

            console.log('!!!!!!!');
            // Go to waiting room
            router.push(`/join?party=${partyID}`);
        }
    
        } catch {
        setJoinError('Error joining: please try again');
        } 
    };
  
    return (
        <Form onSubmit={handleJoin} onChange={() => {setJoinError(null)}} className="w-full">
            <input
                name="partyID"
                className="mb-4"
                placeholder="Party code"
                type="text"
                required
            />
            <Button type="submit" className="secondary" text="Join party" name="joinParty"/>
            <Error error={joinError} />
        </Form>
    );
};

export default JoinPartyForm;