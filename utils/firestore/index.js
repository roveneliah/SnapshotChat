import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const prodConfig = {
  apiKey: process.env.NEXT_PUBLIC_apiKey,
  authDomain: process.env.NEXT_PUBLIC_authDomain,
  projectId: process.env.NEXT_PUBLIC_projectId,
  storageBucket: process.env.NEXT_PUBLIC_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_appId,
};
const firebaseApp = initializeApp(prodConfig);
const db = getFirestore(firebaseApp);
// connectFirestoreEmulator(db, "localhost", 8080);

import { buildProposalsAdaptor } from "./proposals";
export const { updateProposal, addPost, getPosts, listenForPosts } =
  buildProposalsAdaptor(db);

import {
  buildCreatePetition,
  buildDeletePetition,
  buildFetchPetitions,
  buildPostSigner,
  buildListenForPetitions,
} from "./petitions";
export const createPetition = buildCreatePetition(db);
export const fetchPetitions = buildFetchPetitions(db);
export const postSigner = buildPostSigner(db);
export const listenForPetitions = buildListenForPetitions(db);
export const deletePetition = buildDeletePetition(db);

import {
  fetchTeams as buildFetchTeams,
  addTeams as buildAddTeams,
  listenForTeams as buildListenForTeams,
} from "./teams";
export const fetchTeams = buildFetchTeams(db);
export const addTeams = buildAddTeams(db);
export const listenForTeams = buildListenForTeams(db);

import { buildListenForJerrys } from "./jerrys";
export const listenForJerrys = buildListenForJerrys(db);

import {
  buildLoadProfileAtAddress,
  buildCreateProfileWithData,
  buildGetProfile,
} from "./walletProfiles";
export const loadProfileAtAddress = buildLoadProfileAtAddress(db);
export const createProfileWithData = buildCreateProfileWithData(db);
export const getProfile = buildGetProfile(db);
