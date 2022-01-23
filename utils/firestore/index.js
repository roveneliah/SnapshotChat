import { initializeApp, } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';



const firebaseApp = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_apiKey,
    authDomain: process.env.NEXT_PUBLIC_authDomain,
    projectId: process.env.NEXT_PUBLIC_projectId,
    storageBucket: process.env.NEXT_PUBLIC_storageBucket,
    messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
    appId: process.env.NEXT_PUBLIC_appId
});

const db = getFirestore(firebaseApp)

import { buildProposalsAdaptor } from './proposals'
export const { updateProposal, addPost, getPosts } = buildProposalsAdaptor(db)

import { buildCreatePetition, buildFetchPetitions, buildPostSigner } from './petitions';
export const createPetition = buildCreatePetition(db);
export const fetchPetitions = buildFetchPetitions(db);
export const postSigner = buildPostSigner(db);