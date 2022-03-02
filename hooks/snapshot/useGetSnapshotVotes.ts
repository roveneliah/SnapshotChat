import { voteArray2Types } from "@snapshot-labs/snapshot.js/dist/sign/types";
import { map } from "ramda";
import { useEffect, useRef, useState } from "react";
import { SnapshotVote } from "../../components/ForumPage/Forum/ForumPosts/SnapshotPosts";
import { fetchProposalVotes } from "../../utils/Snapshot/fetch";
import { getKhVotingPower } from "../../utils/Snapshot/getVotingPower";
import { useGetVotingPower } from "./useGetVotingPower";

export const useGetProposalVotes = (proposal: any) => {
  const [votes, setVotes] = useState<any>();
  useEffect(() => {
    fetchProposalVotes(proposal.id).then(setVotes);
  }, []);
  return [votes, setVotes];
};

export const useGetWeightedSnapshotVotes = (proposal: any) => {
  const [votes, setVotes] = useGetProposalVotes(proposal);

  // get voting power once we have votes
  useEffect(() => {
    if (votes) {
      getKhVotingPower(
        votes.map((vote: SnapshotVote) => vote.voter.toLowerCase()),
        proposal.snapshot
      )
        .then((votingPower: any) =>
          votes.map((vote: SnapshotVote) =>
            Object.assign(vote, { vp: votingPower[vote.voter.toLowerCase()] })
          )
        )
        .then(setVotes);
    }
  }, [proposal]);

  return votes;
};
