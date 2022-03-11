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

export const buildProposalsAdaptor = (db) => ({
  updateProposal: updateProposal(db),
  addPost: addPost(db),
  getPosts: getPosts(db),
  listenForPosts: listenForPosts2(db),
  addVoteToForumPost: addVoteToForumPost(db),
  createProposal: createProposal(db),
});

const createProposal = (db) => async (proposal) =>
  await addDoc(collection(db, "drafts"), proposal);

// don't override existing ones...
const updateProposal = (db) => async (proposal) =>
  await setDoc(doc(db, "proposals", proposal.id), proposal, { merge: true });

// TODO: remove provider and edit calling code
const addPost = (db) => (provider) => async (proposalId, post) => {
  const proposal = await getDoc(doc(db, "proposals", proposalId));

  if (proposal.exists()) {
    const { posts: existingPosts } = proposal.data();

    await setDoc(
      doc(db, "proposals", proposalId),
      {
        posts: { ...existingPosts, [post.author]: post },
      },
      { merge: true }
    );
  }
};

const addVoteToForumPost = (db) => async (signer, proposalId, post, vote) => {
  signMessage(signer)({
    // TODO: need some check on whether this user is a token holder or not
    author: post.author,
    post: post.post,
    proposalId,
    choice: vote.choice,
    signer: await signer.getAddress(),
  }).then(async (msg) => {
    const proposal = await getDoc(doc(db, "proposals", proposalId)); // TODO: I can just pass in the posts I have from onSnapshot listener
    if (proposal.exists()) {
      const { posts: existingPosts } = proposal.data();
      const originalPost = existingPosts[post.author];
      setDoc(doc(db, "proposals", proposalId), {
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

const getPosts = (db) => (provider) => async (proposalId) => {
  const proposal = await getDoc(doc(db, "proposals", proposalId));
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

export const listenForPosts =
  (db) => (provider) => async (proposalId, callback) => {
    onSnapshot(doc(db, "proposals", proposalId), async (proposal) => {
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

export const listenForPosts2 =
  (db) => (provider) => async (proposalId, callback) => {
    onSnapshot(doc(db, "proposals", proposalId), async (proposal) => {
      const { posts } = proposal.data();
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
