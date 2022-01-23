
import { addDoc, setDoc, doc, collection, getFirestore, getDoc, getDocs } from 'firebase/firestore';
import { balanceOf } from '../balanceOf';
import { $KRAUSE, CROWDFUND } from '../../config';

export const buildProposalsAdaptor = (db) => ({
    updateProposal: updateProposal(db),
    addPost: addPost(db),
    getPosts: getPosts(db),
})

// don't override existing ones...
const updateProposal = (db) => async (proposal) => (
    await setDoc(doc(db, "proposals", proposal.id), proposal, {merge: true})
)

// TODO: remove provider and edit calling code
const addPost = (db) => (provider) => async (proposalId, post) => {
    const proposal = await getDoc(doc(db, "proposals", proposalId));
    
    if (proposal.exists()) {
        const { posts: existingPosts } = proposal.data();

        await setDoc(doc(db, "proposals", proposalId), {
            posts: {...existingPosts, [post.author]: post }
        }, { merge: true })
    }
}

const getPosts = (db) => (provider) => async (proposalId) => {
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