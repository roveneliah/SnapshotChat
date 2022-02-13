import Forum from "../components/Forum";
import { ProposalsList } from "../components/ProposalsList/ProposalsList";
import { proposalById } from "../utils/functional";
import { signMessage, submit } from "../utils/submit";
import { useEffect, useState } from "react";
import { useGetProposals } from "../hooks/useGetProposals";

export function ForumPage(props) {
  const [selectedProposal, setSelectedProposal] = useState();
  const proposals = useGetProposals(props.snapshotSpace);

  return (
    <div>
      {selectedProposal ? (
        <Forum
          proposal={proposalById(proposals, selectedProposal)}
          setSelectedProposal={setSelectedProposal}
          signer={props.signer}
          provider={props.provider}
          userProfile={props.userProfile}
        />
      ) : (
        proposals && (
          <ProposalsList
            proposals={proposals}
            setSelectedProposal={setSelectedProposal}
          />
        )
      )}
    </div>
  );
}
