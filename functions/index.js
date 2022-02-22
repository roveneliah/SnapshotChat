const functions = require("firebase-functions");

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const algoliasearch = require("algoliasearch");

const APP_ID = functions.config().algolia.app;
const ADMIN_KEY = functions.config().algolia.key;

const client = algoliasearch(APP_ID, ADMIN_KEY);
const index = client.initIndex("krausehouse-profiles");

exports.addToIndex = functions.firestore
  .document("profiles/{profileId}")
  .onCreate((snapshot) => {
    const data = snapshot.data();
    const objectID = snapshot.id;
    return index.addObject({
      ...data,
      objectID,
    });
  });

exports.updateIndex = functions.firestore
  .document("profiles/{profileId}")
  .onUpdate((change) => {
    const newData = change.after.data();
    const objectID = change.after.id;
    return index.saveObject({ ...newData, objectID });
  });

exports.deleteFromIndex = functions.firestore
  .document("profiles/{profileId}")
  .onDelete((snapshot) => index.deleteObject(snapshot.id));

const { migrateRoster } = require("./migrateRoster");
exports.mergeRosterData = functions.pubsub
  .schedule("0 0 * * *")
  .timeZone("America/New_York")
  .onRun(async (context) => {
    const promise = migrateRoster();
    promise.then((res, e) => {
      console.log(e ? e : res);
      console.log("MERGED FROM ROSTER");
    });
  });

// exports.mergeRosterDataManual = functions.https.onRequest((req, res) => {
//   console.log("YO");
//   const promise = migrateRoster();
//   promise.then((res2, e) => {
//     console.log("MERGED FROM ROSTER");
//     res.send(e ? e : res2);
//   });
// });
