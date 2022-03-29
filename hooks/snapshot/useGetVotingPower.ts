import { useEffect, useState } from "react";
import { getKhVotingPower } from "../../utils/Snapshot/getVotingPower";
import { address } from "../../types/Address";
import { getKrauseBalances } from "../../utils/web3/getKrauseBalances";

export const useGetVotingPower = (
  addresses?: address[],
  blockNumber?: number,
  provider?: any
) => {
  const [votingPower, setVotingPower] = useState<any>();
  useEffect(() => {
    if (addresses && blockNumber) {
      getKhVotingPower(addresses, blockNumber).then(setVotingPower);
    } else if (addresses) {
      getKrauseBalances(provider, addresses).then((balances: any) => {
        const scores = addresses.reduce((acc, addr, i) => {
          return { ...acc, [addr]: balances[i] / 1e18 };
        }, {});
        setVotingPower(scores);
      });
    }
  }, [addresses]);

  return votingPower;
};
