import {
  addDoc,
  setDoc,
  doc,
  collection,
  getFirestore,
  getDoc,
  getDocs,
} from "firebase/firestore";

export const buildCreatePetition = (db) => async (petition) =>
  await setDoc(doc(db, "petitions", petition.id), petition);

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
