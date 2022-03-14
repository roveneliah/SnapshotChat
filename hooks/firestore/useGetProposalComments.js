import { useState, useEffect } from "react";
import { listenForDraftPosts, listenForPosts } from "../../utils/firestore";

export const useGetProposalComments = (provider, { id: proposalId, state }) => {
  const [posts, setPosts] = useState();

  useEffect(() => {
    // set the post data, need to load the current token weight
    state === "review"
      ? listenForDraftPosts(provider)(proposalId, setPosts)
      : listenForPosts(provider)(proposalId, setPosts);
  }, []);

  return posts;
};
