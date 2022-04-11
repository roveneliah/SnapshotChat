import ForumPosts from "./ForumPosts";
import CommentBox from "./CommentBox";
import ProposalCard from "./ProposalCard";
import { useGetProposalComments } from "../../../hooks/firestore/useGetProposalComments";
import { compose, descend, filter, pipe, prop, sortWith } from "ramda";
import { useEffect, useRef, useState } from "react";
import SnapshotPosts from "./ForumPosts/SnapshotPosts";
import { useGetWeightedSnapshotVotes } from "../../../hooks/snapshot/useGetSnapshotVotes";
import { sorts, filters } from "./ForumComplex";
import { useGetVotingPowerFromVotes } from "../../../hooks/snapshot/useGetVotingPowerFromVotes";
import { HeadingFaint } from "../../Generics/Headings/HeadingFaint";
import { Row } from "../../Generics/Row";

const useGetSortedVotes = (votes) => {
  const [sortedVotes, setSortedVotes] = useState();
  useEffect(() => {
    votes && setSortedVotes(sortWith([descend(prop("vp"))])(votes));
  }, [votes]);
  return sortedVotes;
};

const postTypeFilters = [
  {
    name: "Any",
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

// TODO: MAKE A BOX FOR FOLLOWS THAT ISN'T A POST (not everyone posts)

function CommentView(props) {
  return (
    <div>
      {props.myVote?.length > 0 ? (
        <SnapshotPosts
          connection={props.connection}
          votes={props.myVote}
          proposalId={props.proposal.id}
          proposal={props.proposal}
          votingPower={props.votingPower}
        />
      ) : (
        props.myPosts && (
          <ForumPosts
            connection={props.connection}
            posts={props.myPosts}
            proposalId={props.proposal.id}
            proposal={props.proposal}
          />
        )
      )}
      {props.myRetrospectivePosts && (
        <ForumPosts
          connection={props.connection}
          posts={props.myRetrospectivePosts}
          proposalId={props.proposal.id}
          proposal={props.proposal}
        />
      )}
      <CommentBox connection={props.connection} proposal={props.proposal} />
    </div>
  );
}

export default function ForumNew({
  connection,
  proposal,
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

  const posts = useGetProposalComments(provider, proposal);
  const sortedPosts = sorts[0].sort(posts)?.filter(matchesOutcome);

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
            <div className="flex flex-col space-y-6 p-6 bg-white rounded-lg border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700">
              <HeadingFaint title="Filter Comments" size="xl" />
              <div>
                {/* <HeadingFaint title="Post Type" size="md" /> */}
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
              {/* <div>
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
              </div> */}
            </div>
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
          </>
        )}
      </div>
    </div>
  );
}
