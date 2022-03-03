import { useEffect, useState } from "react";
import { fetchProposalVote } from "../../utils/Snapshot/fetch";
import { address } from "../web3/useGetWeb3";

/**
 * Get a specific voters vote on a Snapshot proposal.
 */
export const useGetSnapshotVote = (proposalId: string, address: address) => {
  const [vote, setVote] = useState(null);
  useEffect(() => {
    if (proposalId && address) {
      fetchProposalVote(proposalId, address).then((vote) => {
        console.log(vote);
        setVote(vote);
      });
    }
  }, []);
  return vote;
};
