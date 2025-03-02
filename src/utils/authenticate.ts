import { readData } from './firebaseUtils';
import { cookies } from 'next/headers';

// Middleware to authenticate requests
export async function authenticate() {
  const cookieStore = cookies();
  const sessionId = cookieStore.get('sessionId')?.value;

  if (!sessionId) {
    return { isAuthenticated: false };
  }

  try {
    const session = await readData(`sessions/${sessionId}`);

    if (!session) {
      return { isAuthenticated: false };
    }

    return { isAuthenticated: true, user: { id: session.userId } };
  } catch (err) {
    console.log(err);
    return { isAuthenticated: false };
  }
}