import { useState, useEffect } from "react";
import { getPosts, listenForPosts } from "../../utils/firestore";

export const useGetProposalComments = (provider, { id: proposalId }) => {
  const [posts, setPosts] = useState();

  useEffect(() => {
    // set the post data, need to load the current token weight
    listenForPosts(provider)(proposalId, setPosts);
  }, []);

  return [posts, setPosts];
};
