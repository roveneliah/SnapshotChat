import Forum from "./Forum";
import {
  printPass,
  proposalById,
  draftBySignature,
} from "../../utils/functional";
import { useEffect, useState } from "react";
import { useGetProposals } from "../../hooks/firestore/useGetProposals";
import { useGetAllUserVotes } from "../../hooks/snapshot/useGetAllUserVotes";
import ProposalsList from "./ProposalsList/ProposalsList";
import { useGetNotionDrafts } from "../../hooks/notion/useGetNotionDrafts";

export default function ForumPage(props) {
  const [selectedProposal, setSelectedProposal] = useState();
  const proposals = useGetProposals(props.snapshotSpace);
  const drafts = [];
  const userVotes = useGetAllUserVotes(props.snapshotSpace, props.wallet);

  return proposals?.[selectedProposal] ? (
    <Forum
      connection={props}
      // proposal={proposalById(proposals.concat(drafts), selectedProposal)}
      proposal={proposals[selectedProposal]}
      selectedProposal={selectedProposal}
      setSelectedProposal={setSelectedProposal}
      userVotes={userVotes}
    />
  ) : (
    proposals && (
      <ProposalsList
        connection={props}
        proposals={proposals}
        drafts={drafts}
        userVotes={userVotes}
        setSelectedProposal={setSelectedProposal}
      />
    )
  );
}
