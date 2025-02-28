// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBNEX6bquyhxoo6XZoZ8BNSLTkXjfy26U",
  authDomain: "untitled-51d85.firebaseapp.com",
  projectId: "untitled-51d85",
  storageBucket: "untitled-51d85.firebasestorage.app",
  messagingSenderId: "971592188934",
  appId: "1:971592188934:web:40f659d5b7cb7e7a2a6f87",
  measurementId: "G-FNR5HR0PWE",
  databaseURL: "https://untitled-51d85-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export { database };
export { ref };
export { onValue };
export { once };




