import snapshot from "@snapshot-labs/snapshot.js";
import { head } from "ramda";
import { address } from "../../types/Address";
import { SnapshotSpace } from "../../types/SnapshotSpace";

export const fetchVotingPower =
  (space: SnapshotSpace) =>
  async (addresses: address[], blockNumber: number) => {
    const { name, strategies, network } = space;
    return await snapshot.utils
      .getScores(name, strategies, network, addresses, blockNumber)
      .then(head)
      .catch((e) => {
        console.log("Couldn't fetch voting power.", e);
        return {};
      });
  };

const kh_space: SnapshotSpace = {
  name: "krausehouse.eth",
  network: "1",
  strategies: [
    {
      name: "erc20-balance-of",
      params: {
        address: "0x9f6f91078a5072a8b54695dafa2374ab3ccd603b",
        symbol: "KRAUSE",
        decimals: 18,
      },
    },
  ],
};
export const getKhVotingPower = fetchVotingPower(kh_space);
