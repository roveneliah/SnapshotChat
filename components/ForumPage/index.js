import Forum from "./Forum";
import { printPass, proposalById } from "../../utils/functional";
import { useEffect, useState } from "react";
import { useGetProposals } from "../../hooks/firestore/useGetProposals";
import { useGetAllUserVotes } from "../../hooks/snapshot/useGetAllUserVotes";
import ProposalsList from "./ProposalsList/ProposalsList";

export default function ForumPage(props) {
  const [selectedProposal, setSelectedProposal] = useState();
  const proposals = useGetProposals(props.snapshotSpace);
  const userVotes = useGetAllUserVotes(props.snapshotSpace, props.wallet);

  return selectedProposal ? (
    <Forum
      connection={props}
      proposal={proposalById(proposals, selectedProposal)}
      setSelectedProposal={setSelectedProposal}
      userVotes={userVotes}
    />
  ) : (
    proposals && (
      <ProposalsList
        connection={props}
        proposals={proposals}
        userVotes={userVotes}
        setSelectedProposal={setSelectedProposal}
      />
    )
  );
}
