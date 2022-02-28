import { addRequestMeta } from "next/dist/server/request-meta";
import { useEffect, useState } from "react";
import { SnapshotVote } from "../../components/ForumPage/Forum/ForumPosts/SnapshotPosts";
import {
  fetchVotingPower,
  getKhVotingPower,
} from "../../utils/Snapshot/getVotingPower";
import { address } from "../web3/useGetWeb3";
import { Maybe } from "../web3/useListenWallet";

export const useGetVotingPower = (
  addresses?: address[],
  blockNumber?: number
) => {
  const [votingPower, setVotingPower] = useState<any>();
  useEffect(() => {
    // TODO: generalize this to other spaces
    if (addresses && blockNumber) {
      getKhVotingPower(addresses, blockNumber).then((scores) => {
        setVotingPower(scores);
      });
    }
  }, [addresses]);

  return votingPower;
};

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
