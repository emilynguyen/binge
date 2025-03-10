import { ref, set, get, child, onValue, off, push } from "firebase/database";
import { database } from "@/lib/firebase";

export const writeData = async (path, data) => {
  try {
    await set(ref(database, path), data);
    console.log("Data written successfully");
  } catch (error) {
    console.error("Error writing data: ", error);
  }
};

export const readData = async (path) => {
  const dbRef = ref(database);
  try {
    const snapshot = await get(child(dbRef, path));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error reading data: ", error);
    return null;
  }
};

export const pushData = async (path, data, customKey = null) => {
  const dbRef = ref(database, path);
  try {
    let newRef;
    if (customKey) {
      newRef = ref(database, `${path}/${customKey}`);
      await set(newRef, data);
    } else {
      newRef = push(dbRef);
      await set(newRef, data);
    }
    return newRef.key || customKey;
  } catch (error) {
    console.error("Error pushing data: ", error);
    return null;
  }
};

export const removeData = async (path) => {
  try {
    await remove(ref(database, path));
    console.log("Data removed successfully!");
  } catch (error) {
    console.error("Error removing data: ", error);
  }
};

export const getMembersRef = (partyID) => {
  return ref(database, `/${partyID}/members`);
};

/**
 * Used on /join to provide live party member count
 * @param {*} partyID 
 * @param {*} callback 
 * @returns 
 */
export const listenToMembers = (partyID, callback) => {
  const membersRef = ref(database, `/${partyID}/members`);
  const unsubscribe = onValue(membersRef, (snapshot) => {
    const membersData = snapshot.val();
    callback(membersData || {});
  });

  return () => off(membersRef, 'value', unsubscribe);
};

/**
 * Used on /join to check when party starts
 * @param {*} partyID 
 * @param {*} callback 
 * @returns 
 */
export const listenToStart = (partyID, callback) => {
  const startRef = ref(database, `/${partyID}/isStarted`);
  const unsubscribe = onValue(startRef, (snapshot) => {
    const startData = snapshot.val();
    callback(startData || false);
  });

  return () => off(startRef, 'value', unsubscribe);
};


/**
 * Used on /swipe to watch for a party match
 * @param {*} partyID 
 * @param {*} callback 
 * @returns 
 */
export const listenToBusinessMatch = (partyID, callback) => {
  const businessMatchRef = ref(database, `/${partyID}/businessMatch`);
  const unsubscribe = onValue(businessMatchRef, (snapshot) => {
    const businessMatchData = snapshot.val();
    callback(businessMatchData || null);
  });

  return () => off(businessMatchRef, 'value', unsubscribe);
};

/**
 * Used on /swipe to watch for how many businesses have been eliminated
 * @param {*} partyID 
 * @param {*} callback 
 * @returns 
 */
export const listenToEliminationCount = (partyID, callback) => {
  const eliminationCountRef = ref(database, `/${partyID}/eliminationCount`);
  const unsubscribe = onValue(eliminationCountRef, (snapshot) => {
    const eliminationCountData = snapshot.val();
    callback(eliminationCountData || 0);
  });

  return () => off(eliminationCountRef, 'value', unsubscribe);
};