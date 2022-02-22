// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const functions = require("firebase-functions");
const { createProfileWithData } = require("./profiles");
const { collection, getDocs, getFirestore } = require("firebase/firestore");

const { roster } = functions.config();
const firebaseConfig = {
  apiKey: roster.apikey,
  authDomain: roster.authdomain,
  projectId: roster.projectid,
  storageBucket: roster.storagebucket,
  messagingSenderId: roster.messagingsenderid,
  appId: roster.appid,
  measurementId: roster.measurementid,
  // apiKey: process.env.NEXT_PUBLIC_roster_apiKey,
  // authDomain: process.env.NEXT_PUBLIC_roster_authDomain,
  // projectId: process.env.NEXT_PUBLIC_roster_projectId,
  // storageBucket: process.env.NEXT_PUBLIC_roster_storageBucket,
  // messagingSenderId: process.env.NEXT_PUBLIC_roster_messagingSenderId,
  // appId: process.env.NEXT_PUBLIC_roster_appId,
  // measurementId: process.env.NEXT_PUBLIC_roster_measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig, "Roster");
const db = getFirestore(app);

exports.migrateRoster = async () => {
  console.log("TRYING TO GET DOCS");
  await getDocs(collection(db, "users")).then((docs) => {
    docs.forEach((doc, i) => {
      console.log("GOT DOCS");
      const user = doc.data();
      // if (i % 10 == 0) console.log(user);
      if (user.address) {
        createProfileWithData(user); // TODO: if they already exist, we're accidentally overwriting them
      }
    });
  });
};
