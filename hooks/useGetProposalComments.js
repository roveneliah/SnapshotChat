import { useState, useEffect } from "react";
import { getPosts } from "../utils/firestore";
import { printPass } from "../utils/functional";

export const useGetProposalComments = (provider, { id: proposalId }) => {
  const [posts, setPosts] = useState();

  useEffect(() => {
    // set the post data, need to load the current token weight
    getPosts(provider)(proposalId).then(printPass).then(setPosts);
  }, []);

  return posts;
};
