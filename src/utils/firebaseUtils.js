import { ref, set, get, child, onValue, off } from "firebase/database";
import { database } from "@/lib/firebase";

export const writeData = async (path, data) => {
  try {
    await set(ref(database, path), data);
    console.log("Data written successfully!");
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

export const listenToMembers = (partyID, callback) => {
  const membersRef = getMembersRef(partyID);
  const unsubscribe = onValue(membersRef, (snapshot) => {
    const membersData = snapshot.val();
    callback(membersData || {});
  });

  return () => off(membersRef, 'value', unsubscribe);
};