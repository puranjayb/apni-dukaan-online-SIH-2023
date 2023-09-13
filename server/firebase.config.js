const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: "sih-2023-af6ca",
  storageBucket: "sih-2023-af6ca.appspot.com",
  messagingSenderId: "492749356954",
  appId: process.env.FIREBASE_APP_ID,
  measurementId: "G-1S1WFJJQZR",
  storageBucket: "gs://sih-2023-af6ca.appspot.com",
};

let firebaseApp;
let storage;

const initializeFirebase = async () => {
  firebaseApp = initializeApp(firebaseConfig);
  console.log("Firebase Ready");
  storage = getStorage(firebaseApp);
  console.log("Storage Ready");
};

module.exports = { initializeFirebase, storage, firebaseApp };
