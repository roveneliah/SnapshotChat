import Forum from "./Forum";
import { printPass, draftBySignature } from "../../utils/functional";
import { useEffect, useState } from "react";
import { useGetProposals } from "../../hooks/firestore/useGetProposals";
import { useGetAllUserVotes } from "../../hooks/snapshot/useGetAllUserVotes";
import ProposalsList from "./ProposalsList/ProposalsList";
import { useGetNotionDrafts } from "../../hooks/notion/useGetNotionDrafts";
import { compose, equals, head, prop } from "ramda";

export const proposalById = (proposals, id) =>
  head(proposals?.filter(compose(equals(id), prop("id"))) ?? []);

export default function ForumPage(props) {
  const [selectedProposal, setSelectedProposal] = useState();
  const proposals = useGetProposals(props.snapshotSpace);
  const drafts = [];
  const userVotes = useGetAllUserVotes(props.snapshotSpace, props.wallet);

  const proposal = proposalById(proposals, selectedProposal);

  console.log("proposals", proposals);

  return proposal ? (
    <Forum
      connection={props}
      // proposal={proposalById(proposals.concat(drafts), selectedProposal)}
      proposal={proposal}
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
