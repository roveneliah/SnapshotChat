// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createProfileWithData } from "./firestore";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { buildCreateProfileWithData } from "./firestore/walletProfiles";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_roster_apiKey,
  authDomain: process.env.NEXT_PUBLIC_roster_authDomain,
  projectId: process.env.NEXT_PUBLIC_roster_projectId,
  storageBucket: process.env.NEXT_PUBLIC_roster_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_roster_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_roster_appId,
  measurementId: process.env.NEXT_PUBLIC_roster_measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig, "Roster");
const db = getFirestore(app);

export const migrateRoster = async () => {
  getDocs(collection(db, "users")).then((docs) => {
    docs.forEach((doc) => {
      const user = doc.data();
      if (user.address) {
        console.log(doc.data());
        createProfileWithData(doc.data()); // TODO: if they already exist, we're accidentally overwriting them
      }
    });
  });
};
