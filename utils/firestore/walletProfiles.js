import {
  addDoc,
  setDoc,
  doc,
  collection,
  getFirestore,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

export const buildLoadProfileAtAddress = (db) => async (address, callback) => {
  if (!address) return;
  console.log("LOADING PROFILE", address);
  onSnapshot(doc(db, "profiles", address), async (snapshot) => {
    const walletProfile = snapshot.data();

    // if no wallet profile, make a new one...
    const profile = walletProfile || (await buildCreateProfile(db)(address));
    const follow = (address) => buildFollowAddress(db)(profile, address);
    const unfollow = (address) => buildUnfollowAddress(db)(profile, address);
    callback({ ...profile, follow, unfollow });
  });
};

export const buildCreateProfile = (db) => async (address) => {
  console.log("CREATING PROFILE");
  await setDoc(doc(db, "profiles", address), {
    address,
    following: [""],
    filters: ["$KRAUSE Holders"],
  });
};

export const buildFollowAddress = (db) => async (profile, followAddress) => {
  // make sure not already following
  console.log("FOLLOWING: ", followAddress);
  if (!profile.following.includes(followAddress)) {
    await setDoc(doc(db, "profiles", profile.address), {
      ...profile,
      following: [...profile.following, followAddress],
    });
  }
};

export const buildUnfollowAddress =
  (db) => async (profile, unfollowAddress) => {
    console.log("UNFOLLOW ", unfollowAddress);
    if (profile.following.includes(unfollowAddress)) {
      await setDoc(doc(db, "profiles", profile.address), {
        ...profile,
        following: profile.following.filter(
          (address) => address !== unfollowAddress
        ),
      });
    } else {
      console.log("WAS NOT FOLLOWING");
    }
  };

export const buildCreateProfileWithData = (db) => async (rosterEntry) => {
  console.log("CREATING PROFILE");
  await setDoc(doc(db, "profiles", rosterEntry.address), {
    ...rosterEntry,
    following: [""],
    filters: ["$KRAUSE Holders"],
  });
};
