import { map } from "ramda";
import { useEffect, useState } from "react";
import { updateProposal } from "../../utils/firestore";
import { fetchProposals } from "../../utils/Snapshot/fetch";

export const useGetProposals = (snapshotSpace) => {
  const [proposals, setProposals] = useState();

  const updateDb = map(updateProposal);
  useEffect(() => {
    proposals ||
      fetchProposals(snapshotSpace).then((proposals) => {
        updateDb(proposals); // update in firebase
        console.log("FETCHED PROSAOLASDFS");
        setProposals(proposals); // setProposals in state
      });
  });

  return proposals;
};
