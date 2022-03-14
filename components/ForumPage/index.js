import Forum from "./Forum";
import {
  printPass,
  proposalById,
  draftBySignature,
} from "../../utils/functional";
import { useState } from "react";
import { useGetProposals } from "../../hooks/firestore/useGetProposals";
import { useGetAllUserVotes } from "../../hooks/snapshot/useGetAllUserVotes";
import ProposalsList from "./ProposalsList/ProposalsList";
import { useGetDrafts } from "../../hooks/firestore/useGetDrafts";

export default function ForumPage(props) {
  const [selectedProposal, setSelectedProposal] = useState();
  const proposals = useGetProposals(props.snapshotSpace);
  const drafts = useGetDrafts();
  const userVotes = useGetAllUserVotes(props.snapshotSpace, props.wallet);

  console.log(drafts);

  return selectedProposal ? (
    <Forum
      connection={props}
      proposal={proposalById(proposals.concat(drafts), selectedProposal)}
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
