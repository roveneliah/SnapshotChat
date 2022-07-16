import Forum from "./Forum";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useGetProposals } from "../../hooks/firestore/useGetProposals";
import { useGetAllUserVotes } from "../../hooks/snapshot/useGetAllUserVotes";
import ProposalsList from "./ProposalsList/ProposalsList";
import { compose, equals, head, prop } from "ramda";

export const proposalById = (proposals, id) =>
  head(proposals?.filter(compose(equals(id), prop("id"))) ?? []);

export default function ForumPage(props) {
  const [selectedProposal, setSelectedProposal] = useState();
  const proposals = useGetProposals(props.snapshotSpace);
  const drafts = [];
  const userVotes = useGetAllUserVotes(props.snapshotSpace, props.wallet);
  const proposal = useMemo(
    () => proposalById(proposals, selectedProposal),
    [proposals, selectedProposal]
  );

  return proposal ? (
    <Forum
      connection={props}
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
