import { NextResponse } from 'next/server';
import { readData } from '@/utils/firebaseUtils';


async function handleCreate(req) {
  // Check /create for location
  const url = new URL(req.url);
  const location = url.searchParams.get('location');

  // Redirect if no partyID
  if (!location) {
    console.log('No location passed to /create');
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}



async function handleJoin(req) {
  // Check /join for partyID
  const url = new URL(req.url);
  const partyID = url.searchParams.get('party');

  // Redirect if no partyID
  if (!partyID) {
    console.log('No party name passed to /join');
    return NextResponse.redirect(new URL('/', req.url));
  }

  // If partyID, check that user has the same partyID and partyID exists in db
  try {
    // Get party and user's sessionID
    const party = await readData(`/${partyID}`);
    const sessionID = req.cookies.get('sessionID')?.value;

    // Redirect if either do not exist
    if (!party || !sessionID) {
      console.log('Party or sessionID' + partyID + ' not found');
      return NextResponse.redirect(new URL('/', req.url));
    }

    // Check that user is part of this party
    const memberExists = party.members.some(member => member.id === sessionID);

    // Continue to waiting room if they are
    if (memberExists) {
      return NextResponse.next();
    }
 
    console.log('sessionID not in this party');
    return NextResponse.redirect(new URL('/', req.url));

  } catch (err) {
    console.log(err);
    return NextResponse.redirect(new URL('/', req.url));
  }
}

async function handleSwipe(req) {
  // Check /swipe for partyID
  const url = new URL(req.url);
  const partyID = url.searchParams.get('party');
  const partyExists = await readData('/${partyID}');

  // Redirect if no partyID or if party not found
  if (!partyID || !partyExists) {
    console.log('Invalid partyID passed to /swipe');
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

// TODO does not check db yet
async function handleGeneric(req) {
  const sessionID = req.cookies.get('sessionID')?.value;
  const partyID = req.cookies.get('partyID')?.value;

  /*
  const cookieStore = await cookies();
  const sessionID2 = cookieStore.get('sessionID')?.value;
  const partyID2 = cookieStore.get('partyID')?.value; */

  //console.log('Generic handler: ' + sessionID +", " + partyID);


  if (sessionID && partyID) {
    try {
      // Return party
      const response = NextResponse.next();
      response.headers.set('sessionID', sessionID);
      response.headers.set('partyID', partyID);
      return response; 

    } catch (err) {
      console.log(err);
      return NextResponse.redirect(new URL('/', req.url));
    }
  } 

  // Error
 // console.log('No sessionID or partyID in cookies');
   //return NextResponse.redirect(new URL('/', req.url));
}

export async function middleware(req) {
  const url = new URL(req.url);
  const pathname = url.pathname;

  
  if (pathname === '/') {
    //return;
  }

  if (pathname.startsWith('/join')) {
    return handleJoin(req);
  }

  if (pathname.startsWith('/create')) {
    return handleCreate(req);
  }

  if (pathname.startsWith('/swipe')) {
    return handleSwipe(req);
  }

  

  // Default to generic handler for all other routes
  return handleGeneric(req);
}

export const config = {
  matcher: ['/((?!^/_next/static|favicon.ico).*)', '/join']
};