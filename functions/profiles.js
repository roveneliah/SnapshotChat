const { initializeApp } = require("firebase/app");
const functions = require("firebase-functions");
const {
  getFirestore,
  setDoc,
  doc,
  connectFirestoreEmulator,
} = require("firebase/firestore");

const { profiles } = functions.config();
const prodConfig = {
  apiKey: profiles.apikey,
  authDomain: profiles.authdomain,
  projectId: profiles.projectid,
  storageBucket: profiles.storagebucket,
  messagingSenderId: profiles.messagingsenderid,
  appId: profiles.appid,
};
const firebaseApp = initializeApp(prodConfig);
const db = getFirestore(firebaseApp);
// connectFirestoreEmulator(db, "localhost", 8080);

const buildCreateProfileWithData = (db) => async (rosterEntry) => {
  console.log("CREATING or UPDATING PROFILE");
  await setDoc(
    doc(db, "profiles", rosterEntry.address),
    {
      ...rosterEntry,
      filters: ["$KRAUSE Holders"],
    },
    { merge: true }
  );
};
exports.createProfileWithData = buildCreateProfileWithData(db);
