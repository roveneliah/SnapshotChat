import Markdown from "markdown-to-jsx";

import { Button } from "../../Buttons/Button";
import { Heading } from "../../Generics/Headings/Heading";
import { Badge } from "../../Generics/Badge";
import { HeadingFaint } from "../../Generics/Headings/HeadingFaint";
import { VotedCard } from "../Forum/VotedCard";
import { useEffect, useState } from "react";
import { useGetProposalVotes } from "../../../hooks/snapshot/useGetSnapshotVotes";
import { printPass } from "../../../utils/functional";
import { useGetProposalScores } from "../../../hooks/snapshot/useGetProposalScores";
import { equals, head, map, pick } from "ramda";
import { shortenAddress } from "../../../utils/web3/shortenAddress";
import { vote } from "../../../utils/Snapshot/vote";
import { useGetFollowingVotes } from "../../../hooks/useGetFollowingVotes";
import { ProposalStateBadge } from "../Forum/ProposalCard/ProposalStateBadge";
import { Row } from "../../Generics/Row";
import Image from "next/image";
import Link from "next/link";

export const ProposalListItem = ({
  provider,
  setSelectedProposal,
  proposal,
  index,
  userVote,
  votesLoaded,
  wallet,
  userProfile,
}) => {
  // const voteChoice = (choice) =>
  //   vote(provider)({
  //     choice,
  //     proposalId: proposal.id,
  //     voteType: proposal.type,
  //     space: proposal.space.id,
  //   });

  return (
    <div
      key={index}
      className="relative flex cursor-pointer flex-col space-y-10 rounded-lg border border-gray-200 bg-cards bg-opacity-75 p-6 shadow-md"
      onClick={() => setSelectedProposal(proposal.id)}
    >
      <div>
        <Row className="mb-2 pb-2">
          <ProposalStateBadge state={proposal.state} />
          <VotedCard
            choice={userVote}
            votesLoaded={votesLoaded}
            wallet={wallet}
          />
        </Row>
        <HeadingFaint title={proposal.title} size="xl" />
      </div>
    </div>
  );
};
