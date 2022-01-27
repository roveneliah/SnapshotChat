import {
  addDoc,
  setDoc,
  doc,
  collection,
  getFirestore,
  getDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";

export const buildCreatePetition = (db) => async (petition) =>
  await setDoc(doc(db, "petitions", petition.id), petition);

export const buildDeletePetition = (db) => async (petition) =>
  await deleteDoc(doc(db, "petitions", petition.id));

export const buildFetchPetitions = (db) => async () =>
  await getDocs(collection(db, "petitions"));

const nullOrProp = (obj, prop) => (obj ? obj[prop] : {});
export const buildPostSigner = (db) => (petition) => async (message) => {
  await setDoc(
    doc(db, "petitions", petition.id),
    {
      signers: {
        ...petition.signers,
        [message.signer]: {
          ...nullOrProp(petition.signers, message.signer),
          ...message,
        },
      },
    },
    { merge: true }
  );
};

export const buildListenForPetitions = (db) => async (callback) => {
  onSnapshot(collection(db, "petitions"), (snapshot) => {
    const petitions = snapshot.docs.map((doc) => doc.data());
    callback(petitions);
  });
};
