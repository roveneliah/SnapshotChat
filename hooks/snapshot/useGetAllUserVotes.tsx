import { Wallet } from "ethers";
import { useEffect, useState } from "react";
import { fetchAllVotes } from "../../utils/Snapshot/fetch";

export const useGetAllUserVotes = (space: string, wallet: Wallet) => {
  const [votes, setVotes] = useState([]);
  useEffect(() => {
    fetchAllVotes(space, wallet?.address)
      .then((votes: any) => votes || [])
      .then((votes: any) =>
        votes.reduce(
          (acc: object, vote: any) => ({
            ...acc,
            [vote.proposal.id]: vote.proposal.choices[vote.choice - 1],
          }),
          {}
        )
      )
      .then((votes) => {
        setVotes(votes);
      });
  }, [wallet]);
  return votes;
};
