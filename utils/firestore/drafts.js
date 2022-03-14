import { addDoc, collection, onSnapshot } from "firebase/firestore";

export const buildCreateDraft = (db) => async (proposal) =>
  await addDoc(collection(db, "drafts"), proposal);

export const buildGetDrafts = (db) => async (callback) =>
  onSnapshot(collection(db, "drafts"), (snapshot) => {
    const drafts = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    callback(drafts);
  });
