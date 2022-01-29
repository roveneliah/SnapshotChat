import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

export const fetchJerrys = (db) => async () => {
  return await getDocs(collection(db, "users")).then((res) =>
    res.docs.map((doc) => doc.data())
  );
};

export const buildListenForJerrys = (db) => async (callback) => {
  onSnapshot(collection(db, "users"), (snapshot) => {
    const jerrys = snapshot.docs.map((doc) => doc.data());
    callback(jerrys);
  });
};

export const addJerrys = (db) => async (jerrys) => {
  Object.keys(jerrys).map((teamName) => {
    setDoc(doc(db, "users", teamName), {
      name: teamName,
      members: jerrys[teamName],
    });
  });
};
