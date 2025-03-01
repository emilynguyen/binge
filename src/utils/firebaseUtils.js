import { ref, set, get, child } from "firebase/database";
import { database } from "@/lib/firebase";

export const writeData = (path, data) => {
  set(ref(database, path), data)
    .then(() => {
      console.log("Data written successfully!");
    })
    .catch((error) => {
      console.error("Error writing data: ", error);
    });
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