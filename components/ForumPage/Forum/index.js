import ForumPosts from "./ForumPosts";
import CommentBox from "./CommentBox";
import ProposalCard from "./ProposalCard";
import { useGetProposalComments } from "../../../hooks/firestore/useGetProposalComments";
import { compose, descend, filter, pipe, prop, sortWith } from "ramda";
import { useEffect, useMemo, useRef, useState } from "react";
import SnapshotPosts from "./ForumPosts/SnapshotPosts";
import { useGetWeightedSnapshotVotes } from "../../../hooks/snapshot/useGetSnapshotVotes";
import { sorts, filters } from "./ForumComplex";
import { useGetVotingPowerFromVotes } from "../../../hooks/snapshot/useGetVotingPowerFromVotes";
import { HeadingFaint } from "../../Generics/Headings/HeadingFaint";
import { Row } from "../../Generics/Row";
import { Heading } from "../../Generics/Headings/Heading";
import { ChoiceFilters } from "./ProposalCard/ChoiceFilters";
import { useGetProposalScores } from "../../../hooks/snapshot/useGetProposalScores";
import { CommentView } from "./CommentView";

const useGetSortedVotes = (votes) => {
  const [sortedVotes, setSortedVotes] = useState();
  useEffect(() => {
    votes && setSortedVotes(sortWith([descend(prop("vp"))])(votes));
  }, [votes]);
  return sortedVotes;
};

const postTypeFilters = [
  {
    name: "All",
  },
  {
    name: "Vote",
    filter: ({ type }) => type !== "opinion" || type !== "retrospective",
  },
  { name: "Opinion", filter: ({ retrospective }) => true },
  { name: "Retrospective", filter: ({ retrospective }) => retrospective },
];

const posterFilters = [
  { name: "Anyone", filter: () => true },
  { name: "Following", filter: () => true },
  { name: "Full-time team", filter: () => true },
  { name: "Contributors", filter: () => true },
];

export default function ForumNew({
  connection,
  proposal,
  selectedProposal,
  setSelectedProposal,
  userVotes,
}) {
  // TODO: REFACTOR
  const noFilter = () => selectedVote == null;
  const matchesOutcome = (post) =>
    post.outcome === proposal.choices[selectedVote] || noFilter();
  const userIsAuthor = (post) =>
    post.author.toLowerCase() === wallet?.address?.toLowerCase();
  const userIsFollowing = (post) =>
    userProfile?.following?.includes(post.author.toLowerCase());

  const { provider, userProfile, wallet } = connection;
  const [selectedVote, setSelectedVote] = useState(null);

  const [commentView, setCommentView] = useState(false);
  const [selectedPostTypeFilter, setSelectedPostTypeFilter] = useState(0);
  const [selectedPosterFilter, setSelectedPosterFilter] = useState(0);

  const votes = useGetWeightedSnapshotVotes(proposal);
  const sortedVotes = useGetSortedVotes(votes);
  const votingPower = useGetVotingPowerFromVotes(votes, proposal.snapshot);

  const scores = useGetProposalScores(proposal, votes);

  const posts = useGetProposalComments(provider, proposal);
  // TODO: useMemo for these, no point to redo all these sorts
  const sortedPosts = useMemo(
    () => sorts[0].sort(posts)?.filter(matchesOutcome),
    [posts, selectedVote]
  );

  const opinionPosts = sortedPosts?.filter(
    ({ retrospective }) => !retrospective
  );
  const myPosts = opinionPosts?.filter(userIsAuthor);
  const followedPosts = opinionPosts
    ?.filter(userIsFollowing)
    .filter((post) => !userIsAuthor(post));
  const otherPosts = opinionPosts
    ?.filter((post) => !userIsFollowing(post))
    .filter((post) => !userIsAuthor(post));

  const retrospectivePosts = sortedPosts
    ?.filter(matchesOutcome)
    .filter(({ retrospective }) => retrospective === true);
  const myRetrospectivePosts = retrospectivePosts?.filter(userIsAuthor);
  const followingRetrospectives = retrospectivePosts
    ?.filter(userIsFollowing)
    .filter((post) => !userIsAuthor(post));
  const otherRetrospectives = retrospectivePosts
    ?.filter((post) => !userIsFollowing(post))
    .filter((post) => !userIsAuthor(post));

  const hasMessage = (vote) => vote.metadata.message;
  const matchesOutcome1 = (vote) =>
    vote.choice === selectedVote + 1 || noFilter();
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
    <div className="flex flex-row justify-center ">
      <div className="flex flex-col h-[90vh] overflow-auto w-[85vw] lg:w-[70vw] xl:w-[60vw] space-y-4 p-6 border-gray-200">
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
            commentView={commentView}
            setCommentView={setCommentView}
          />
        </div>

        {commentView ? (
          <CommentView
            connection={connection}
            proposal={proposal}
            votingPower={votingPower}
            myPosts={myPosts}
            myRetrospectivePosts={myRetrospectivePosts}
            myVote={myVote}
          />
        ) : (
          <>
            {/* <div className="flex flex-col space-y-6 p-6 bg-cards bg-opacity-75 rounded-lg border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700">
              <HeadingFaint title="Filter Posts" size="xl" />
              <div>
                <Row>
                  {postTypeFilters.map((postType, i) => (
                    <span
                      className={
                        i === selectedPostTypeFilter
                          ? `select-none cursor-pointer bg-purple-100 text-purple-800 text-sm font-semibold px-2.5 py-0.5 rounded dark:bg-purple-200 dark:text-purple-900`
                          : `select-none cursor-pointer bg-gray-100 text-gray-800 text-sm font-semibold px-2.5 py-0.5 rounded dark:bg-gray-200 dark:text-gray-900`
                      }
                      onClick={() => setSelectedPostTypeFilter(i)}
                      key={i}
                    >
                      {postType.name}
                    </span>
                  ))}
                </Row>
              </div>
              <ChoiceFilters
                proposal={proposal}
                selectedVote={selectedVote}
                setSelectedVote={setSelectedVote}
                scores={scores}
              />
              <div>
                <HeadingFaint title="Posted By" size="md" />
                <Row className="flex-wrap">
                  {posterFilters.map((postType, i) => (
                    <span
                      className={
                        i === selectedPosterFilter
                          ? `select-none cursor-pointer bg-purple-100 text-purple-800 text-sm font-semibold px-2.5 py-0.5 rounded dark:bg-purple-200 dark:text-purple-900`
                          : `select-none cursor-pointer bg-gray-100 text-gray-800 text-sm font-semibold px-2.5 py-0.5 rounded dark:bg-gray-200 dark:text-gray-900`
                      }
                      onClick={() => setSelectedPosterFilter(i)}
                    >
                      {postType.name}
                    </span>
                  ))}
                </Row>
              </div>
            </div> */}
            {(selectedPostTypeFilter === 0 || selectedPostTypeFilter === 1) && (
              <>
                <SnapshotPosts
                  connection={connection}
                  votes={myVote}
                  proposalId={proposal.id}
                  proposal={proposal}
                  votingPower={votingPower}
                />
                <SnapshotPosts
                  connection={connection}
                  votes={followingVotes}
                  proposalId={proposal.id}
                  proposal={proposal}
                  votingPower={votingPower}
                />
                <SnapshotPosts
                  connection={connection}
                  votes={otherVotes}
                  proposalId={proposal.id}
                  proposal={proposal}
                  votingPower={votingPower}
                />
              </>
            )}
            {(selectedPostTypeFilter === 0 || selectedPostTypeFilter === 2) && (
              <>
                <ForumPosts
                  connection={connection}
                  posts={myPosts}
                  proposalId={proposal.id}
                  proposal={proposal}
                />
                <ForumPosts
                  connection={connection}
                  posts={followedPosts}
                  proposalId={proposal.id}
                  proposal={proposal}
                />

                <ForumPosts
                  connection={connection}
                  posts={otherPosts}
                  proposalId={proposal.id}
                  proposal={proposal}
                />
              </>
            )}
            {(selectedPostTypeFilter === 0 || selectedPostTypeFilter === 3) && (
              <>
                <ForumPosts
                  connection={connection}
                  posts={myRetrospectivePosts}
                  proposalId={proposal.id}
                  proposal={proposal}
                />
                <ForumPosts
                  connection={connection}
                  posts={followingRetrospectives}
                  proposalId={proposal.id}
                  proposal={proposal}
                />
                <ForumPosts
                  connection={connection}
                  posts={otherRetrospectives}
                  proposalId={proposal.id}
                  proposal={proposal}
                />
              </>
            )}
            {commentView && (
              <CommentBox connection={connection} proposal={proposal} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
