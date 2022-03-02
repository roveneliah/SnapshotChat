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
      proposal={proposalById(proposals, selectedProposal)}
      setSelectedProposal={setSelectedProposal}
      signer={props.signer}
      provider={props.provider}
      userProfile={props.userProfile}
      wallet={props.wallet}
      userVotes={userVotes}
    />
  ) : (
    proposals && (
      <ProposalsList
        proposals={proposals}
        userVotes={userVotes}
        setSelectedProposal={setSelectedProposal}
        wallet={props.wallet}
        userProfile={props.userProfile}
        following={props.following}
      />
    )
  );
}
