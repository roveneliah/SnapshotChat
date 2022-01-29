import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

export const fetchTeams = (db) => async () => {
  return await getDocs(collection(db, "teams")).then((res) =>
    res.docs.map((doc) => doc.data())
  );
};

export const listenForTeams = (db) => async (callback) => {
  onSnapshot(collection(db, "teams"), (snapshot) => {
    const teams = snapshot.docs.map((doc) => doc.data());
    callback(teams);
  });
};

export const addTeams = (db) => async (teams) => {
  Object.keys(teams).map((teamName) => {
    setDoc(doc(db, "teams", teamName), {
      name: teamName,
      members: teams[teamName],
    });
  });
};
