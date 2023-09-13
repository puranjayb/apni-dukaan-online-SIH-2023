const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: "sih-2023-af6ca",
  storageBucket: "gs://sih-2023-af6ca.appspot.com",
  messagingSenderId: "492749356954",
  appId: process.env.FIREBASE_APP_ID,
  measurementId: "G-1S1WFJJQZR",
};

let firebaseApp;
let storage;

const initializeFirebase = () => {
  firebaseApp = initializeApp(firebaseConfig);
  console.log("Firebase Ready");
};

module.exports = { initializeFirebase, firebaseApp };
