import ForumPosts from "./ForumPosts";
import CommentBox from "./CommentBox";
import ProposalCard from "./ProposalCard";
import { useGetProposalComments } from "../../../hooks/firestore/useGetProposalComments";
import {
  any,
  compose,
  equals,
  filter,
  length,
  pipe,
  prop,
  propEq,
} from "ramda";
import { useMemo, useRef, useState } from "react";
import SnapshotPosts from "./ForumPosts/SnapshotPosts";
import { useGetWeightedSnapshotVotes } from "../../../hooks/snapshot/useGetSnapshotVotes";
import { sorts, filters } from "./ForumComplex";
import { useGetVotingPowerFromVotes } from "../../../hooks/snapshot/useGetVotingPowerFromVotes";
import { useGetProposalScores } from "../../../hooks/snapshot/useGetProposalScores";
import { useGetFollowingVotes } from "../../../hooks/useGetFollowingVotes";
import { useGetSortedVotes } from "../../../hooks/snapshot/useGetSortedVotes";
import { ForumFilterView } from "./ForumFilterView";
import { DelegationPreviewCard } from "./DelegationPreviewCard";

// export const postTypeFilters = [
//   {
//     name: "All",
//   },
//   {
//     name: "Vote",
//     filter: ({ type }) => type !== "opinion" || type !== "retrospective",
//   },
//   { name: "Opinion", filter: ({ retrospective }) => true },
//   { name: "Retrospective", filter: ({ retrospective }) => retrospective },
// ];

// export const posterFilters = [
//   { name: "Anyone", filter: () => true },
//   { name: "Following", filter: () => true },
//   { name: "Full-time team", filter: () => true },
//   { name: "Contributors", filter: () => true },
// ];

const hasMessage = (vote) => vote.metadata.message;
const not = (x) => !x;
const concat = (...arrs) => arrs.reduce((acc, arr) => acc.concat(arr), []);
const exists = compose(not, equals(undefined));
const falsy = (x) => x == undefined;
const concatTruthy = (...arr) => concat(...arr).filter(exists);
const propFalsy = (propName) => compose(falsy, prop(propName));
const splitFilter = (predicate) => (arr) =>
  arr.reduce((acc, val) => acc[predicate(val) ? 0 : 1].concat(val), [[], []]);

const doEverything =
  (selectedVote, proposal, wallet, userProfile) => (votes, posts) => {
    // SOME IMPURE FUNCTIONS / HELPERS
    const noFilter = () => selectedVote == null;
    const matchesOutcome = (post) =>
      post.outcome === proposal.choices[selectedVote] || noFilter();
    const userIsAuthor = (post) =>
      post.author.toLowerCase() === wallet?.address?.toLowerCase();
    const userIsFollowing = (post) =>
      userProfile?.following?.includes(post.author.toLowerCase());
    const notAuthor = compose(not, userIsAuthor);
    const matchesOutcome1 = (vote) =>
      vote.choice === selectedVote + 1 || noFilter();
    const userIsAuthor1 = (vote) =>
      vote.voter.toLowerCase() === wallet?.address?.toLowerCase();
    const userIsFollowing1 = (vote) =>
      userProfile?.following?.includes(vote.voter.toLowerCase());

    const notFollowing = compose(not, userIsFollowing);
    const filterFollowing = compose(filter(userIsFollowing), filter(notAuthor));
    const filterOthers = compose(filter(notFollowing), filter(notAuthor));

    const categorizeComments = (posts) => ({
      mine: posts?.filter(userIsAuthor),
      followed: filterFollowing(posts ?? []),
      other: filterOthers(posts ?? []),
    });

    const sortedPosts = useMemo(
      () => sorts[0].sort(posts)?.filter(matchesOutcome),
      [posts, selectedVote]
    );

    const sortedVotes = useGetSortedVotes(votes);
    const filteredVotes = sortedVotes
      ?.filter(matchesOutcome1)
      .filter(hasMessage);
    const myVote = filteredVotes?.filter(userIsAuthor1);
    const followingVotes = filteredVotes?.filter(userIsFollowing1);
    const otherVotes = filteredVotes?.filter(
      (vote) => !userIsAuthor1(vote) && !userIsFollowing1(vote)
    );
    const orderedVotes = concatTruthy(myVote, followingVotes, otherVotes);

    const retrospectivePosts = sortedPosts?.filter(
      propEq("retrospective", true)
    );
    const retrospectives = categorizeComments(retrospectivePosts);
    const orderedRetrospectives = concatTruthy(
      retrospectives.mine,
      retrospectives.followed,
      retrospectives.other
    );

    const opinionPosts = sortedPosts?.filter(
      propEq("retrospective", undefined)
    );
    const opinions = categorizeComments(opinionPosts);
    const orderedComments = concatTruthy(
      opinions.mine,
      opinions.followed,
      opinions.other
    );

    return { orderedVotes, orderedComments, orderedRetrospectives };
  };

export default function ForumNew({
  connection,
  proposal,
  selectedProposal,
  setSelectedProposal,
  userVotes,
}) {
  // STATE / PROPS - COMPONENT DATA TODO: can I get rid of any of this?
  const { provider, userProfile, wallet } = connection;
  const [selectedVote, setSelectedVote] = useState(null);

  // View Filters
  const [selectedPostTypeFilter, setSelectedPostTypeFilter] = useState(0);
  const [selectedPosterFilter, setSelectedPosterFilter] = useState(0);
  const showComments = () =>
    selectedPostTypeFilter === 0 || selectedPostTypeFilter === 1;
  const showVotes = () =>
    selectedPostTypeFilter === 0 || selectedPostTypeFilter === 2;
  const showRetrospectives = () =>
    selectedPostTypeFilter === 0 || selectedPostTypeFilter === 3;

  // VOTES - SHOULD ALL BE NESTED IN HOOK
  const votes = useGetWeightedSnapshotVotes(proposal); // TODO:
  const posts = useGetProposalComments(provider, proposal);
  const { orderedComments, orderedVotes, orderedRetrospectives } = doEverything(
    selectedVote,
    proposal,
    wallet,
    userProfile
  )(votes, posts);

  // const votingPower = useGetVotingPowerFromVotes(votes, proposal.snapshot);
  // const scores = useGetProposalScores(proposal, votes); // TODO: WTF is this?  Fallback for live proposals?

  // DELEGATION CARD PREVIEW
  const delegationVotes = useGetFollowingVotes(
    proposal,
    connection.userProfile
  );
  const votesFromDelegation =
    delegationVotes && any(compose(exists, length))(delegationVotes);

  return (
    <div className="flex flex-row justify-center ">
      <div className="flex h-[90vh] w-[85vw] flex-col space-y-4 overflow-auto border-gray-200 p-6 lg:w-[70vw] xl:w-[60vw]">
        <div className="grid grid-cols-1 space-x-4">
          <ProposalCard
            votes={votes}
            proposal={proposal}
            selectedProposal={selectedProposal}
            setSelectedProposal={setSelectedProposal}
            selectedVote={selectedVote}
            setSelectedVote={setSelectedVote}
            userVote={userVotes[proposal.id]}
            votesLoaded={userVotes !== null}
            wallet={connection.wallet}
          />
        </div>
        {votesFromDelegation && selectedVote != undefined && (
          <DelegationPreviewCard
            proposal={proposal}
            selectedVote={selectedVote}
            delegationVotes={delegationVotes}
          />
        )}
        {/* <ForumFilterView
          proposal={proposal}
          selectedVote={selectedVote}
          setSelectedVote={setSelectedVote}
          selectedPostTypeFilter={selectedPostTypeFilter}
          setSelectedPostTypeFilter={setSelectedPostTypeFilter}
          selectedPosterFilter={selectedPosterFilter}
          setSelectedPosterFilter={setSelectedPosterFilter}
          scores={scores}
        /> */}
        {showVotes() && (
          <ForumPosts
            connection={connection}
            posts={orderedVotes}
            proposalId={proposal.id}
            proposal={proposal}
          />
        )}
        {showComments() && (
          <ForumPosts
            connection={connection}
            posts={orderedComments}
            proposalId={proposal.id}
            proposal={proposal}
          />
        )}
        {showRetrospectives() && (
          <ForumPosts
            connection={connection}
            posts={orderedRetrospectives}
            proposalId={proposal.id}
            proposal={proposal}
          />
        )}
        <CommentBox connection={connection} proposal={proposal} />
      </div>
    </div>
  );
}
