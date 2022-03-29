import { useEffect, useState } from "react";
import { SnapshotVote } from "../../types/SnapshotVote";
import { getKhVotingPower } from "../../utils/Snapshot/getVotingPower";

export const useGetVotingPowerFromVotes = (
  votes?: SnapshotVote[],
  blockNumber?: number
) => {
  const [votingPower, setVotingPower] = useState<any>();
  useEffect(() => {
    // TODO: generalize this to other spaces
    if (votes && blockNumber) {
      getKhVotingPower(
        votes.map((vote) => vote.voter),
        blockNumber
      ).then((scores) => {
        setVotingPower(scores);
      });
    }
  }, [votes]);

  return votingPower;
};
