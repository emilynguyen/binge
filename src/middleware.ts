import { NextResponse } from 'next/server';
import { readData } from '@/utils/firebaseUtils';
import { clearCookies, deleteCookie } from '@/utils/cookieUtils';



async function isParty(partyID) {
  console.log('Checking if ' + partyID + ' party exists');
  try {
    const party = await readData(`/${partyID}`);
    return !!party;
  } catch {
    console.error('Error checking if party exists');
    return false;
  }
}

async function isPartyStarted(partyID) {
  console.log('Checking if ' + partyID + ' party has started');
  try {
    const isStarted = await readData(`/${partyID}/isStarted`);
    return isStarted;
  } catch {
    console.error('Error checking if party has started');
    return false;
  }
}

// Check that member is in the given party
/*
async function isAuthenticated(sessionID, partyID) {
    try {
      // Return false if party or user does not exist
      const party = await readData(`/${partyID}`);
      if (!sessionID || !party) return false;
  
      // Check that user is part of this party
      const memberExists = party.members.some(member => member.id === sessionID);

      return memberExists;
    } catch {
      console.error('Error authenticating user');
      return false;
    }

}
*/

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
    // If no cookies, redirect home
    const sessionID = req.cookies.get('sessionID')?.value;
    const partyID = req.cookies.get('partyID')?.value;

    if (!sessionID || !partyID) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    const url = new URL(req.url);
    const partyParam = url.searchParams.get('party');

    // If cookie and params match, check that party exists
    if (partyID == partyParam) {
      try {
        const partyExists = await isParty(partyID);
            
        // If party exists, continue to /join
        if (partyExists) {
          return NextResponse.next();
        } else {
          // If party does not exist, clear cookies and redirect home
          console.log('Party does not exist anymore, clearing cookies');
          await clearCookies();
          return NextResponse.redirect(new URL('/', req.url));
        }
      } catch {
        console.error('Error authenticating user');
        return NextResponse.redirect(new URL('/', req.url));
      } 
    }

    // If cookie and params do not match, redirect to correct url
    const redirectUrl = new URL('/join', req.url);
    redirectUrl.searchParams.set('party', partyID);
    return NextResponse.redirect(redirectUrl);
}



async function handleSwipe(req) {
    // If no cookies, redirect home
    const sessionID = req.cookies.get('sessionID')?.value;
    const partyID = req.cookies.get('partyID')?.value;

    if (!sessionID || !partyID) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    const url = new URL(req.url);
    const partyIDParam = url.searchParams.get('party');
    const sessionIDParam = url.searchParams.get('member');


    // If cookie and params match, check that party exists
    if (partyID == partyIDParam && sessionID == sessionIDParam) {
      try {
        const partyExists = await isParty(partyID);
            
        // If party exists, continue to /swipe
        if (partyExists) {
          return NextResponse.next();
        } else {
          // If party does not exist, clear cookies and redirect home
          console.log('Party does not exist anymore, clearing cookies');
          await clearCookies();
          return NextResponse.redirect(new URL('/', req.url));
        }
      } catch {
        console.error('Error authenticating user');
        return NextResponse.redirect(new URL('/', req.url));
      } 
    }

    // If cookie and params do not match, redirect to correct url
    const redirectUrl = new URL('/swipe', req.url);
    redirectUrl.searchParams.set('party', partyID);
    redirectUrl.searchParams.set('member', sessionID);
    return NextResponse.redirect(redirectUrl);
}

// TODO does not check db yet
// if no cookies, go home
// if cookies & party is still in db > check isStarted
/*
async function handleGeneric(req) {
  const sessionID = req.cookies.get('sessionID')?.value;
  const partyID = req.cookies.get('partyID')?.value;
  
  try {
    const party = await readData(`/${partyID}`);

    if (party) {
      console.log("Party exists, checking if it's started...");
      const isStarted = await readData(`/${partyID}/isStarted`);

      // Redirect to /swipe if partyID exists and isStarted = true
      if (isStarted) {
        const redirectUrl = new URL('/swipe', req.url);
        redirectUrl.searchParams.set('party', partyID);
        return NextResponse.redirect(redirectUrl);
      } else {
        // Redirect to /join if partyID exists and isStarted = false
        const redirectUrl = new URL('/join', req.url);
        redirectUrl.searchParams.set('party', partyID);
        return NextResponse.redirect(redirectUrl);
      }
    }

    // Redirect home if party does not exist
    return NextResponse.redirect(new URL('/', req.url));

    
  } catch {
    console.error('Error checking if party has started');
  }



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

*/

export async function middleware(req) {
  const url = new URL(req.url);
  const pathname = url.pathname;

  // Allow API routes to pass through
  /*
  if (req.nextUrl.pathname.startsWith("/_next") || pathname.startsWith('/api') || pathname.startsWith('/public')) {
    return NextResponse.next();
  } */

    // Exclude all files in the public folder
    if (req.nextUrl.pathname.includes('.')) {
      return NextResponse.next();
    }

  const sessionID = req.cookies.get('sessionID')?.value;
  const partyID = req.cookies.get('partyID')?.value;


  // Redirect if cookies
  if (sessionID && partyID) {
    try {
      // TODO Delete cookies if party expired or ended
      const partyRef = await readData(`/${partyID}`);
      if (!partyRef) {
        clearCookies();
        return NextResponse.redirect(new URL('/', req.url));
      }

      const isStarted = await isPartyStarted(partyID);

      // Handle /join and /swipe
      if (pathname.startsWith('/join') && !isStarted) {
        return handleJoin(req);
      }
      if (pathname.startsWith('/swipe') && isStarted) {
        return handleSwipe(req);
      }
    
      // Redirect if neither
      if (isStarted) {
        return NextResponse.redirect(new URL('/swipe', req.url));
      } else {
        return NextResponse.redirect(new URL('/join', req.url));
      }
    } catch (err) {
      console.error(err);
    }  
  }

  



  if (pathname === '/') {
    return NextResponse.next();
  }

  if (pathname.startsWith('/create')) {
    return handleCreate(req);
  }

  return NextResponse.redirect(new URL('/', req.url));

  
  // Default to generic handler for all other routes
  //return handleGeneric(req);
}


export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 
 
