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
import { useGetVotingPowerFromVotes } from "../../../hooks/snapshot/useGetVotingPowerFromVotes";
import { Col } from "../../Generics/Col";
import { Row } from "../../Generics/Row";
import { Heading } from "../../Generics/Headings/Heading";
import { HeadingFaint } from "../../Generics/Headings/HeadingFaint";
import { Button } from "../../Buttons/Button";
import { Badge } from "../../Generics/Badge";

const useGetSortedVotes = (votes) => {
  const [sortedVotes, setSortedVotes] = useState();
  useEffect(() => {
    votes && setSortedVotes(sortWith([descend(prop("vp"))])(votes));
  }, [votes]);
  return sortedVotes;
};

const useCycler = (arr) => {
  const [i, setI] = useState(0);
  const selectNext = () => setI((i + 1) % arr.length);
  return [arr[i], selectNext];
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

  const [commentView, setCommentView] = useState(true);
  const [postTimeFilter, togglePostTimeFilter] = useCycler([
    "any time",
    "during voting",
    "after voting",
  ]);
  const [posterFilter, togglePosterFilter] = useCycler([
    "anyone",
    "following",
    // "contributors",
    // "full-time team",
    // "DAO summoners",
  ]);

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

  const myPosts = sortedPosts
    ?.filter(userIsAuthor)
    .filter(matchesOutcome)
    .filter(({ retrospective }) => !retrospective);

  const myRetrospectivePosts = sortedPosts
    ?.filter(userIsAuthor)
    .filter(matchesOutcome)
    .filter(({ retrospective }) => retrospective === true);

  const followedPosts = sortedPosts
    ?.filter(userIsFollowing)
    .filter(matchesOutcome)
    .filter((post) => !userIsAuthor(post))
    .filter(({ retrospective }) => !retrospective);

  const otherPosts = sortedPosts
    ?.filter((post) => !userIsFollowing(post))
    .filter(matchesOutcome)
    .filter((post) => !userIsAuthor(post))
    .filter(({ retrospective }) => !retrospective);

  const retrospectivePosts = sortedPosts
    ?.filter(matchesOutcome)
    .filter(({ retrospective }) => retrospective === true);

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
      <div className="flex flex-col w-2/5 space-y-4 p-6 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <ProposalCard
          votes={votes}
          proposal={proposal}
          setSelectedProposal={setSelectedProposal}
          selectedVote={selectedVote}
          setSelectedVote={setSelectedVote}
          userVote={userVotes[proposal.id]}
          votesLoaded={userVotes !== null}
          wallet={connection.wallet}
          commentView={commentView}
          setCommentView={setCommentView}
        />
      </div>
      <div className="flex flex-col w-1/2 space-y-4 p-6 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        {commentView ? (
          <>
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
            {myRetrospectivePosts && (
              <ForumPosts
                connection={connection}
                posts={myRetrospectivePosts}
                proposalId={proposal.id}
                proposal={proposal}
              />
            )}
            <CommentBox connection={connection} proposal={proposal} />
          </>
        ) : (
          <>
            <div className="flex flex-col space-y-6 p-6 bg-white rounded-lg border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700">
              <HeadingFaint title="Filter Comments" size="xl" />
              <h2>
                Posted{" "}
                <span
                  className={`select-none cursor-pointer bg-purple-100 text-purple-800 text-sm font-semibold px-2.5 py-0.5 rounded dark:bg-purple-200 dark:text-purple-900`}
                  onClick={togglePostTimeFilter}
                >
                  {postTimeFilter}
                </span>{" "}
                by{" "}
                <span
                  className={`select-none cursor-pointer bg-purple-100 text-purple-800 text-sm font-semibold px-2.5 py-0.5 rounded dark:bg-purple-200 dark:text-purple-900`}
                  onClick={togglePosterFilter}
                >
                  {posterFilter}
                </span>
                .
              </h2>
            </div>
            {(postTimeFilter === "during voting" ||
              postTimeFilter === "any time") &&
            myVote?.length > 0 ? (
              <SnapshotPosts
                connection={connection}
                votes={myVote}
                proposalId={proposal.id}
                proposal={proposal}
                votingPower={votingPower}
              />
            ) : (
              (postTimeFilter === "during voting" ||
                postTimeFilter === "any time") &&
              (posterFilter === "anyone" || posterFilter === "me") &&
              myPosts && (
                <ForumPosts
                  connection={connection}
                  posts={myPosts}
                  proposalId={proposal.id}
                  proposal={proposal}
                />
              )
            )}
            {(postTimeFilter === "during voting" ||
              postTimeFilter === "any time") &&
              (posterFilter === "anyone" || posterFilter === "following") &&
              followingVotes && (
                <SnapshotPosts
                  connection={connection}
                  votes={followingVotes}
                  proposalId={proposal.id}
                  proposal={proposal}
                  votingPower={votingPower}
                />
              )}
            {(postTimeFilter === "during voting" ||
              postTimeFilter === "any time") &&
              (posterFilter === "anyone" || posterFilter === "following") &&
              followedPosts && (
                <ForumPosts
                  connection={connection}
                  posts={followedPosts}
                  proposalId={proposal.id}
                  proposal={proposal}
                />
              )}
            {(postTimeFilter === "during voting" ||
              postTimeFilter === "any time") &&
              posterFilter === "anyone" &&
              otherVotes && (
                <SnapshotPosts
                  connection={connection}
                  votes={otherVotes}
                  proposalId={proposal.id}
                  proposal={proposal}
                  votingPower={votingPower}
                />
              )}
            {(postTimeFilter === "during voting" ||
              postTimeFilter === "any time") &&
              posterFilter === "anyone" &&
              otherPosts && (
                <ForumPosts
                  connection={connection}
                  posts={otherPosts}
                  proposalId={proposal.id}
                  proposal={proposal}
                />
              )}
            {(postTimeFilter === "any time" ||
              postTimeFilter === "after voting") &&
              retrospectivePosts && (
                <ForumPosts
                  connection={connection}
                  posts={retrospectivePosts}
                  proposalId={proposal.id}
                  proposal={proposal}
                />
              )}
          </>
        )}
      </div>
    </div>
  );
}
