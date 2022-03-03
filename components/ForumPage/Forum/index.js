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
import {
  useGetVotingPower,
  useGetVotingPowerFromVotes,
} from "../../../hooks/snapshot/useGetVotingPower";

// TODO: this doesn't feel like a hook...?
export const useGetVoters = (votes) => {
  const [voters, setVoters] = useState();
  useEffect(() => {
    if (votes) {
      setVoters([...votes?.map((vote) => vote.voter.toLowerCase())] || []);
    }
  }, [votes]);

  return voters;
};

const useGetSortedVotes = (votes) => {
  const [sortedVotes, setSortedVotes] = useState();
  useEffect(() => {
    votes && setSortedVotes(sortWith([descend(prop("vp"))])(votes));
  }, [votes]);
  return sortedVotes;
};

// TODO: MAKE A BOX FOR FOLLOWS THAT ISN'T A POST
export default function ForumNew({
  connection,
  proposal,
  setSelectedProposal,
  userVotes,
}) {
  const { provider, signer, userProfile, wallet } = connection;
  const [selectedVote, setSelectedVote] = useState(null);

  const posts = useGetProposalComments(provider, proposal);
  const sortedPosts = compose(sorts[0].sort, filters[0].sort)(posts);

  const votes = useGetWeightedSnapshotVotes(proposal);
  const sortedVotes = useGetSortedVotes(votes);

  const votingPower = useGetVotingPowerFromVotes(votes, proposal.snapshot);

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
          wallet={wallet}
        />
        {/* Priority to my vote, TODO: need to implement this logic for ALL users */}
        {myVote?.length > 0 ? (
          <SnapshotPosts
            votes={myVote}
            provider={provider}
            userProfile={userProfile}
            signer={signer}
            proposalId={proposal.id}
            proposal={proposal}
            votingPower={votingPower}
          />
        ) : (
          myPosts && (
            <ForumPosts
              provider={provider}
              posts={myPosts}
              userProfile={userProfile}
              signer={signer}
              proposalId={proposal.id}
              proposal={proposal}
            />
          )
        )}
        {followingVotes && (
          <SnapshotPosts
            votes={followingVotes}
            provider={provider}
            userProfile={userProfile}
            signer={signer}
            proposalId={proposal.id}
            proposal={proposal}
            votingPower={votingPower}
          />
        )}
        {followedPosts && (
          <ForumPosts
            provider={provider}
            posts={followedPosts}
            userProfile={userProfile}
            signer={signer}
            proposalId={proposal.id}
            proposal={proposal}
          />
        )}
        {otherVotes && (
          <SnapshotPosts
            votes={otherVotes}
            provider={provider}
            userProfile={userProfile}
            signer={signer}
            proposalId={proposal.id}
            proposal={proposal}
            votingPower={votingPower}
          />
        )}
        {otherPosts && (
          <ForumPosts
            provider={provider}
            posts={otherPosts}
            userProfile={userProfile}
            signer={signer}
            proposalId={proposal.id}
            proposal={proposal}
          />
        )}
        <CommentBox
          wallet={wallet}
          proposal={proposal}
          signer={signer}
          provider={provider}
        />
      </div>
    </div>
  );
}
