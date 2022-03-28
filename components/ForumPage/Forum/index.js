import ForumPosts from "./ForumPosts";
import CommentBox, { useGetSnapshotVote } from "./CommentBox";
import ProposalCard from "./ProposalCard";
import { useGetProposalComments } from "../../../hooks/firestore/useGetProposalComments";
import { compose, descend, filter, pipe, prop, sortWith } from "ramda";
import { useEffect, useRef, useState } from "react";
import { printPass } from "../../../utils/functional";
import SnapshotPosts from "./ForumPosts/SnapshotPosts";
import { useGetWeightedSnapshotVotes } from "../../../hooks/snapshot/useGetSnapshotVotes";
import { sorts, filters } from "./ForumComplex";
import { useGetVotingPowerFromVotes } from "../../../hooks/snapshot/useGetVotingPower";

const useGetSortedVotes = (votes) => {
  const [sortedVotes, setSortedVotes] = useState();
  useEffect(() => {
    votes && setSortedVotes(sortWith([descend(prop("vp"))])(votes));
  }, [votes]);
  return sortedVotes;
};

// TODO: MAKE A BOX FOR FOLLOWS THAT ISN'T A POST (not everyone posts)
export default function ForumNew({
  connection,
  proposal,
  setSelectedProposal,
  userVotes,
}) {
  const { provider, userProfile, wallet } = connection;
  const [selectedVote, setSelectedVote] = useState(null);

  const votes = useGetWeightedSnapshotVotes(proposal);
  const sortedVotes = useGetSortedVotes(votes);
  const votingPower = useGetVotingPowerFromVotes(votes, proposal.snapshot);

  const posts = useGetProposalComments(provider, proposal);
  const sortedPosts = compose(sorts[0].sort, filters[0].sort)(posts);

  // TODO: REFACTOR
  const noFilter = proposal.choices[selectedVote] == null;
  const matchesOutcome = (post) =>
    post.outcome === proposal.choices[selectedVote] || noFilter;
  const userIsAuthor = (post) =>
    post.author.toLowerCase() === wallet?.address?.toLowerCase();
  const userIsFollowing = (post) =>
    userProfile?.following?.includes(post.author.toLowerCase());

  const myPosts = sortedPosts?.filter(userIsAuthor).filter(matchesOutcome);
  const followedPosts = sortedPosts
    ?.filter(userIsFollowing)
    .filter(matchesOutcome)
    .filter((post) => !userIsAuthor(post));

  const otherPosts = sortedPosts
    ?.filter((post) => !userIsFollowing(post))
    .filter(matchesOutcome)
    .filter((post) => !userIsAuthor(post));

  const hasMessage = (vote) => vote.metadata.message;
  const matchesOutcome1 = (vote) =>
    vote.choice === selectedVote + 1 || noFilter;
  const userIsAuthor1 = (vote) =>
    vote.voter.toLowerCase() === wallet?.address?.toLowerCase();
  const userIsFollowing1 = (vote) =>
    userProfile?.following?.includes(vote.voter.toLowerCase());

  const filteredVotes = sortedVotes?.filter(matchesOutcome1).filter(hasMessage);
  const myVote = filteredVotes?.filter(userIsAuthor1).filter(hasMessage);
  const followingVotes = filteredVotes
    ?.filter(userIsFollowing1)
    .filter(hasMessage);
  const otherVotes = filteredVotes
    ?.filter((vote) => !userIsAuthor1(vote) && !userIsFollowing1(vote))
    .filter(hasMessage);

  return (
    <div className="flex flex-row justify-center">
      <div className="flex flex-col w-2/3 space-y-4 p-6 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <ProposalCard
          votes={votes}
          proposal={proposal}
          setSelectedProposal={setSelectedProposal}
          selectedVote={selectedVote}
          setSelectedVote={setSelectedVote}
          userVote={userVotes[proposal.id]}
          votesLoaded={userVotes !== null}
          wallet={connection.wallet}
        />
        {myVote?.length > 0 ? (
          <SnapshotPosts
            connection={connection}
            votes={myVote}
            proposalId={proposal.id}
            proposal={proposal}
            votingPower={votingPower}
          />
        ) : (
          myPosts && (
            <ForumPosts
              connection={connection}
              posts={myPosts}
              proposalId={proposal.id}
              proposal={proposal}
            />
          )
        )}
        {followingVotes && (
          <SnapshotPosts
            connection={connection}
            votes={followingVotes}
            proposalId={proposal.id}
            proposal={proposal}
            votingPower={votingPower}
          />
        )}
        {followedPosts && (
          <ForumPosts
            connection={connection}
            posts={followedPosts}
            proposalId={proposal.id}
            proposal={proposal}
          />
        )}
        {otherVotes && (
          <SnapshotPosts
            connection={connection}
            votes={otherVotes}
            proposalId={proposal.id}
            proposal={proposal}
            votingPower={votingPower}
          />
        )}
        {otherPosts && (
          <ForumPosts
            connection={connection}
            posts={otherPosts}
            proposalId={proposal.id}
            proposal={proposal}
          />
        )}
        {proposal.state !== "closed" && (
          <CommentBox connection={connection} proposal={proposal} />
        )}
      </div>
    </div>
  );
}
