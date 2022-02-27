import ForumPosts from "./ForumPosts";
import CommentBox, { useGetSnapshotVote } from "./CommentBox";
import ProposalCard from "./ProposalCard";

import { submit } from "../../../utils/web3/submit";
import { useGetProposalComments } from "../../../hooks/firestore/useGetProposalComments";
import { Heading } from "../../Generics/Headings/Heading";
import { Button } from "../../Buttons/Button";
import {
  ascend,
  complement,
  compose,
  descend,
  either,
  equals,
  filter,
  gte,
  identity,
  lte,
  pipe,
  prop,
  sortWith,
} from "ramda";
import { useEffect, useRef, useState } from "react";
import { printPass } from "../../../utils/functional";
import { useMultiselect } from "../../../hooks/useMultiselect";
import { fetchProposalVotes } from "../../../utils/Snapshot/fetch";
import SnapshotPosts from "./ForumPosts/SnapshotPosts";

const basicStats = (proposal, sortedPosts) => {
  if (sortedPosts && proposal.type === "basic") {
    return sortedPosts.reduce(
      (acc, post) => {
        console.log(post);
        return {
          ...acc,
          [post.outcome]: acc[post.outcome] + 1,
        };
      },
      proposal.choices.reduce((acc, choice) => ({ ...acc, [choice]: 0 }), {})
    );
  }
};

const sorts = [
  {
    title: "$KRAUSE Balance",
    sort: (posts) =>
      posts &&
      sortWith([descend(pipe(prop("wallet"), prop("$KRAUSE")))])(posts),
  },
  {
    title: "Tickets",
    sort: (posts) =>
      posts &&
      sortWith([descend(pipe(prop("wallet"), prop("TICKETS")))])(posts),
  },
];

const filters = [
  {
    title: "$KRAUSE Holders",
    sort: (posts) =>
      posts && posts.filter(pipe(prop("wallet"), prop("$KRAUSE"))),
  },
  {
    title: "Ticket Holders",
    sort: (posts) =>
      posts && posts.filter(pipe(prop("wallet"), prop("TICKETS"), lte(1))),
  },
  {
    title: "> 5000 $KRAUSE",
    sort: (posts) =>
      posts && posts.filter(pipe(prop("wallet"), prop("$KRAUSE"), lte(5000))),
  },
  {
    title: "Courtside Seating",
    sort: (posts) =>
      posts && posts.filter(pipe(prop("wallet"), prop("COURTSIDE"))),
  },
  {
    title: "Club Level",
    sort: (posts) =>
      posts && posts.filter(pipe(prop("wallet"), prop("CLUB_LEVEL"))),
  },
  {
    title: "Upper Level",
    sort: (posts) =>
      posts && posts.filter(pipe(prop("wallet"), prop("UPPER_LEVEL"))),
  },
  {
    title: "Stewards Team",
    sort: (posts) =>
      posts &&
      posts.filter(pipe(prop("wallet"), prop("teams"), prop("STEWARDS"))), // TODO: pull from teams db and add logic
  },
];

// export function ForumComplex({ proposal, setSelectedProposal, signer, provider }) {
//   const [posts] = useGetProposalComments(provider, proposal);
//   const [sortedPosts, setSortedPosts] = useState(filters[0].sort(posts));
//   const [selectedSorts, flipSort] = useMultiselect(sorts);
//   const [selectedFilters, flipFilter] = useMultiselect(filters);

//   useEffect(() => {
//     const composedCuration = sorts.reduce((composition, sort, i) => {
//       if (selectedSorts[i]) {
//         return pipe(composition, sort.sort);
//       }
//       return composition;
//     }, identity);

//     const composedFilters = filters.reduce((composition, filter, i) => {
//       if (selectedFilters[i]) {
//         return pipe(composition, filter.sort);
//       }
//       return composition;
//     }, identity);

//     setSortedPosts(composedCuration(composedFilters(posts)));
//   }, [selectedSorts, selectedFilters, posts]);

//   const stats = basicStats(proposal, sortedPosts);
//   return (
//     <div className="flex flex-col space-y-4 p-6 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
//       <ProposalCard
//         proposal={proposal}
//         setSelectedProposal={setSelectedProposal}
//         posts={sortedPosts || posts}
//       />
//       <div className="flex flex-col space-y-6 p-6 bg-white rounded-lg border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700">
//         <Heading title="Curate Quorum" size="lg" />
//         <div className="flex flex-row space-x-2">
//           {sortedPosts &&
//             stats &&
//             Object.keys(stats).map((key, i) => (
//               <span
//                 key={i}
//                 className="bg-purple-100 text-purple-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-purple-200 dark:text-purple-900"
//               >
//                 {`${key} ${stats[key]}`}
//               </span>
//             ))}
//         </div>{" "}
//         {/* <div className="flex flex-row space-x-3 flex-wrap">
//           {filters.map(({ title: filter }, i) => (
//             <Button
//               title={filter}
//               color={i === selectedCuration ? "purple" : "hollow"}
//               // onClick={() => setCurate(() => filters[i].sort)}
//               onClick={() => setSelectedCuration(i)}
//               key={i}
//             />
//           ))}
//           </div>{" "} */}
//         <Heading title="Sort By" size="md" />
//         <div className="flex flex-row space-x-3 flex-wrap">
//           {sorts.map(({ title: filter }, i) => (
//             <Button
//               title={filter}
//               color={selectedSorts[i] ? "purple" : "hollow"}
//               // onClick={() => setCurate(() => filters[i].sort)}
//               onClick={() => flipSort(i)}
//               key={i}
//             />
//           ))}
//         </div>
//         <Heading title="Filter" size="md" />
//         <div className="flex flex-row space-x-3 flex-wrap">
//           {filters.map(({ title: filter }, i) => (
//             <Button
//               title={filter}
//               color={selectedFilters[i] ? "purple" : "hollow"}
//               // onClick={() => setCurate(() => filters[i].sort)}
//               onClick={() => flipFilter(i)}
//               key={i}
//             />
//           ))}
//         </div>
//       </div>
//       <ForumPosts provider={provider} posts={sortedPosts || posts} />
//       <CommentBox proposal={proposal} signer={signer} provider={provider} />
//     </div>
//   );
// }

export const VotedCard = ({ choice, votesLoaded, wallet }) =>
  choice ? (
    <div>
      <span className="mb-2 bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">
        Voted: {choice}
      </span>
    </div>
  ) : votesLoaded && wallet.loaded ? (
    <></>
  ) : (
    // <div>
    //   <span className="mb-2 bg-gray-100 text-gray-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-200 dark:text-gray-900">
    //     Abstained
    //   </span>
    // </div>
    <></>
  );

export const useGetSnapshotVotes = (proposalId) => {
  const [votes, setVotes] = useState();
  useEffect(() => {
    fetchProposalVotes(proposalId).then(setVotes);
  }, []);
  return votes;
};

export const useGetVoters = (votes) => {
  const [voters, setVoters] = useState();
  useEffect(() => {
    if (votes) {
      // TODO: but what if just one?
      setVoters([...votes?.map((vote) => vote.voter.toLowerCase())] || []);
    }
  }, [votes]);

  return voters;
};

// TODO: MAKE A BOX FOR FOLLOWS
export default function ForumNew({
  proposal,
  wallet,
  setSelectedProposal,
  signer,
  provider,
  userProfile,
  userVotes,
}) {
  const [selectedVote, setSelectedVote] = useState(null);

  const posts = useGetProposalComments(provider, proposal);
  const sortedPosts = compose(sorts[0].sort, printPass, filters[0].sort)(posts);

  const votes = useGetSnapshotVotes(proposal.id);

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

  console.log("votes", votes);
  console.log("my posts", myPosts);
  console.log("followingPosts: ", followedPosts);
  console.log("otherPosts: ", otherPosts);

  const hasMessage = (vote) => vote.metadata.message;
  const matchesOutcome1 = (vote) =>
    vote.choice === selectedVote + 1 || noFilter;
  const userIsAuthor1 = (vote) =>
    vote.voter.toLowerCase() === wallet?.address?.toLowerCase();
  const userIsFollowing1 = (vote) =>
    userProfile?.following?.includes(vote.voter.toLowerCase());

  const filteredVotes = votes?.filter(matchesOutcome1);
  const myVote = filteredVotes?.filter(userIsAuthor1);
  const followingVotes = filteredVotes?.filter(userIsFollowing1);
  const otherVotes = filteredVotes?.filter(
    (vote) => !userIsAuthor1(vote) && !userIsFollowing1(vote)
  );

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
        {myVote ? (
          <SnapshotPosts
            votes={myVote}
            provider={provider}
            userProfile={userProfile}
            signer={signer}
            proposalId={proposal.id}
            proposal={proposal}
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
