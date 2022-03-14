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
import { balanceOf } from "../web3/balanceOf";
import { $KRAUSE, CROWDFUND } from "../../config";
import { getKHWallet } from "../web3/getKHWallet";
import { signMessage } from "../web3/submit";

export const buildProposalsAdaptor = (db, collectionName) => ({
  updateProposal: buildUpdateProposal(db, collectionName),
  addPost: buildAddPost(db, collectionName),
  getPosts: buildGetPosts(db, collectionName),
  listenForPosts: buildListenForPosts2(db, collectionName),
  addVoteToForumPost: buildAddVoteToForumPost(db, collectionName),
});

export const buildUpdateProposal = (db, collectionName) => async (proposal) =>
  await setDoc(doc(db, collectionName, proposal.id), proposal, { merge: true });

// TODO: remove provider and edit calling code
export const buildAddPost =
  (db, collectionName) => (provider) => async (proposalId, post) => {
    const proposal = await getDoc(doc(db, collectionName, proposalId));

    if (proposal.exists()) {
      const { posts: existingPosts } = proposal.data();

      await setDoc(
        doc(db, collectionName, proposalId),
        {
          posts: { ...existingPosts, [post.author]: post },
        },
        { merge: true }
      );
    }
  };

export const buildAddVoteToForumPost =
  (db, collectionName) => async (signer, proposalId, post, vote) => {
    signMessage(signer)({
      // TODO: need some check on whether this user is a token holder or not
      author: post.author,
      post: post.post,
      proposalId,
      choice: vote.choice,
      signer: await signer.getAddress(),
    }).then(async (msg) => {
      const proposal = await getDoc(doc(db, collectionName, proposalId)); // TODO: I can just pass in the posts I have from onSnapshot listener
      if (proposal.exists()) {
        const { posts: existingPosts } = proposal.data();
        const originalPost = existingPosts[post.author];
        setDoc(doc(db, collectionName, proposalId), {
          posts: {
            ...existingPosts,
            [post.author]: {
              ...originalPost,
              votes: {
                ...originalPost.votes,
                [await signer.getAddress()]: msg,
              },
            },
          },
        });
      }
    });
  };

export const buildGetPosts =
  (db, collectionName) => (provider) => async (proposalId) => {
    const proposal = await getDoc(doc(db, collectionName, proposalId));
    if (proposal.exists()) {
      const { posts } = proposal.data();
      const addCurrentWeight = async (post) => {
        const weight =
          provider && (await balanceOf(provider, $KRAUSE)(post.author)) / 1e18;
        return {
          ...post,
          weight,
        };
      };

      return (
        posts && (await Promise.all(Object.values(posts).map(addCurrentWeight)))
      );
    }
  };

export const buildListenForPosts =
  (db, collectionName) => (provider) => async (proposalId, callback) => {
    onSnapshot(doc(db, collectionName, proposalId), async (proposal) => {
      const { posts } = proposal.data();

      const addCurrentWeight = async (post) => {
        const weight =
          provider && (await balanceOf(provider, $KRAUSE)(post.author)) / 1e18;
        return {
          ...post,
          weight,
        };
      };

      return (
        posts &&
        Promise.all(Object.values(posts).map(addCurrentWeight)).then(callback)
      );
    });
  };

export const buildListenForPosts2 =
  (db, collectionName) => (provider) => async (proposalId, callback) => {
    onSnapshot(doc(db, collectionName, proposalId), async (proposal) => {
      const posts = proposal.data()?.posts;
      return (
        posts &&
        Promise.all(
          Object.values(posts).map(async (post) => ({
            ...post,
            wallet: await getKHWallet(provider)(post.author),
          }))
        ).then(callback)
      );
    });
  };
