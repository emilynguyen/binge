import { useEffect } from 'react';
import { database } from '@/lib/firebase';
import { ref, remove } from 'firebase/database';
import { readData } from '@/utils/firebaseUtils';

export default function CleanupExpiredItems() {
  useEffect(() => {
    const cleanup = async () => {
      try {
        const now = Date.now();
        const oneHourAgo = now - 60 * 60 * 1000;
        const itemsRef = ref(database);
        const snapshot = await readData('/');

        if (snapshot) {
          const updates = {};
          Object.keys(snapshot).forEach((key) => {
            if (snapshot[key].timestamp <= oneHourAgo) { 
              console.log('Removing: ' + snapshot[key]);
              updates[key] = null;
            }
          });
          if (Object.keys(updates).length > 0) {
            await remove(itemsRef, updates);
          }
        }
      } catch (error) {
        console.error('Error during cleanup:', error);
      }
    };

    cleanup();
  }, []);

  return (
    <></>
  );
}