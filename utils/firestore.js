
import { initializeApp, } from 'firebase/app';
import { addDoc, setDoc, doc, collection, getFirestore, getDoc, getDocs } from 'firebase/firestore';
import { balanceOf } from './balanceOf';
import { $KRAUSE, CROWDFUND } from '../config';

const firebaseApp = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_apiKey,
    authDomain: process.env.NEXT_PUBLIC_authDomain,
    projectId: process.env.NEXT_PUBLIC_projectId,
    storageBucket: process.env.NEXT_PUBLIC_storageBucket,
    messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
    appId: process.env.NEXT_PUBLIC_appId
});

const db = getFirestore(firebaseApp)

export const writeTest = async () => (
    await setDoc(doc(db, "proposals", "0x999"), {
        id: "yolo2",
        _id: "oi",
        henlo: "frnds"
    })
)



// don't override existing ones...
export const setProposal = async (proposal) => (
    await setDoc(doc(db, "proposals", proposal.id), proposal, {merge: true})
)

export const addPost = (provider) => async (proposalId, post) => {
    const proposal = await getDoc(doc(db, "proposals", proposalId));
    
    if (proposal.exists()) {
        const { posts: existingPosts } = proposal.data();

        await setDoc(doc(db, "proposals", proposalId), {
            posts: {...existingPosts, [post.author]: post }
        }, { merge: true })
    }
}

export const getPosts = (provider) => async (proposalId) => {
    const proposal = await getDoc(doc(db, "proposals", proposalId));
    if (proposal.exists()) {
        const { posts } = proposal.data();
        const addCurrentWeight = async post => {
            const weight = provider && await balanceOf(provider, $KRAUSE)(post.author) / 1e18;
            return {
                ...post,
                weight
            }
        }

        return posts && await Promise.all(
            Object.values(posts)
                .map(addCurrentWeight)
        )
    }
}