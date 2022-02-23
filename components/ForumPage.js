import Forum from "../components/Forum";
import { ProposalsList } from "../components/ProposalsList/ProposalsList";
import { printPass, proposalById } from "../utils/functional";
import { signMessage, submit } from "../utils/submit";
import { useEffect, useState } from "react";
import { useGetProposals } from "../hooks/useGetProposals";
import { fetchAllVotes } from "../utils/Snapshot/fetch";

export const useGetAllUserVotes = (space, wallet) => {
  const [votes, setVotes] = useState([]);
  useEffect(() => {
    fetchAllVotes(space, wallet?.address)
      .then((votes) => votes || [])
      .then((votes) =>
        votes.reduce(
          (acc, vote) => ({
            ...acc,
            [vote.proposal.id]: vote.proposal.choices[vote.choice - 1],
          }),
          {}
        )
      )
      .then((votes) => {
        setVotes(votes);
      });
  }, [wallet]);
  return votes;
};

export function ForumPage(props) {
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
      />
    )
  );
}
