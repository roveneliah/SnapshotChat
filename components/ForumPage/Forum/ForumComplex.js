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
import { useMultiselect } from "../../../hooks/useMultiselect";

export const sorts = [
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

export const filters = [
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

export function ForumComplex({
  proposal,
  setSelectedProposal,
  signer,
  provider,
}) {
  const [posts] = useGetProposalComments(provider, proposal);
  const [sortedPosts, setSortedPosts] = useState(filters[0].sort(posts));
  const [selectedSorts, flipSort] = useMultiselect(sorts);
  const [selectedFilters, flipFilter] = useMultiselect(filters);

  useEffect(() => {
    const composedCuration = sorts.reduce((composition, sort, i) => {
      if (selectedSorts[i]) {
        return pipe(composition, sort.sort);
      }
      return composition;
    }, identity);

    const composedFilters = filters.reduce((composition, filter, i) => {
      if (selectedFilters[i]) {
        return pipe(composition, filter.sort);
      }
      return composition;
    }, identity);

    setSortedPosts(composedCuration(composedFilters(posts)));
  }, [selectedSorts, selectedFilters, posts]);

  const stats = basicStats(proposal, sortedPosts);
  return (
    <div className="flex flex-col space-y-4 border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <ProposalCard
        proposal={proposal}
        setSelectedProposal={setSelectedProposal}
        posts={sortedPosts || posts}
      />
      <div className="flex flex-col space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
        <Heading title="Curate Quorum" size="lg" />
        <div className="flex flex-row space-x-2">
          {sortedPosts &&
            stats &&
            Object.keys(stats).map((key, i) => (
              <span
                key={i}
                className="mr-2 rounded bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-purple-800 dark:bg-purple-200 dark:text-purple-900"
              >
                {`${key} ${stats[key]}`}
              </span>
            ))}
        </div>{" "}
        {/* <div className="flex flex-row space-x-3 flex-wrap">
          {filters.map(({ title: filter }, i) => (
            <Button
              title={filter}
              color={i === selectedCuration ? "purple" : "hollow"}
              // onClick={() => setCurate(() => filters[i].sort)}
              onClick={() => setSelectedCuration(i)}
              key={i}
            />
          ))}
          </div>{" "} */}
        <Heading title="Sort By" size="md" />
        <div className="flex flex-row flex-wrap space-x-3">
          {sorts.map(({ title: filter }, i) => (
            <Button
              title={filter}
              color={selectedSorts[i] ? "purple" : "hollow"}
              // onClick={() => setCurate(() => filters[i].sort)}
              onClick={() => flipSort(i)}
              key={i}
            />
          ))}
        </div>
        <Heading title="Filter" size="md" />
        <div className="flex flex-row flex-wrap space-x-3">
          {filters.map(({ title: filter }, i) => (
            <Button
              title={filter}
              color={selectedFilters[i] ? "purple" : "hollow"}
              // onClick={() => setCurate(() => filters[i].sort)}
              onClick={() => flipFilter(i)}
              key={i}
            />
          ))}
        </div>
      </div>
      <ForumPosts provider={provider} posts={sortedPosts || posts} />
      <CommentBox proposal={proposal} signer={signer} provider={provider} />
    </div>
  );
}
