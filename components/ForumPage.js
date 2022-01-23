import Forum from "../components/Forum";
import Layout from "../components/Layout";
import { ProposalsList } from "../components/ProposalsList/ProposalsList";
import { updateProposal } from "../utils/firestore";
import { proposalById } from "../utils/functional";
import { fetchProposals } from "../utils/Snapshot/fetch";
import { submit } from "../utils/submit";
import { map } from "ramda";
import { useEffect, useState } from "react";

export function ForumPage(props) {
  const [proposals, setProposals] = useState();
  const [selectedProposal, setSelectedProposal] = useState();
  const [snapshotSpace, setSnapShotSpace] = useState(props.snapshotSpace); // can use this to componentize forum

  const updateDb = map(updateProposal);
  const proposalStuff = () => {
    proposals ||
      fetchProposals(snapshotSpace).then((proposals) => {
        updateDb(proposals); // update in firebase
        setProposals(proposals); // setProposals in state
      });
  };

  useEffect(proposalStuff);

  return selectedProposal ? (
    <Forum
      proposal={proposalById(proposals, selectedProposal)}
      setSelectedProposal={setSelectedProposal}
      signer={props.signer}
      submit={submit(props.signer)}
      hodler={props.hodler}
      connected={props.connected}
      provider={props.provider}
    />
  ) : (
    proposals && (
      <ProposalsList
        proposals={proposals}
        setSelectedProposal={setSelectedProposal}
      />
    )
  );
}
