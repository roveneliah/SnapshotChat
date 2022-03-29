import { useEffect, useState } from "react";
import { SnapshotVote } from "../../types/SnapshotVote";
import { getKhVotingPower } from "../../utils/Snapshot/getVotingPower";
import { balanceOf } from "../../utils/web3/balanceOf";
import { address } from "../../types/Address";
import { $KRAUSE } from "../../config";

export const getKrauseBalances = async (
  provider: any,
  addresses: address[]
) => {
  const balances = await Promise.all(
    addresses.map((addr) => balanceOf(provider, $KRAUSE)(addr))
  );
  return balances;
};

export const useGetVotingPower = (
  addresses?: address[],
  blockNumber?: number,
  provider?: any
) => {
  const [votingPower, setVotingPower] = useState<any>();
  useEffect(() => {
    if (addresses && blockNumber) {
      getKhVotingPower(addresses, blockNumber).then((scores) => {
        console.log("setting voting power", scores);
        setVotingPower(scores);
      });
    } else if (addresses) {
      // not from snapshot, get balance on chain
      getKrauseBalances(provider, addresses).then((balances: any) => {
        console.log("balances", balances);
        const scores = addresses.reduce((acc, addr, i) => {
          return { ...acc, [addr]: balances[i] / 1e18 };
        }, {});
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
