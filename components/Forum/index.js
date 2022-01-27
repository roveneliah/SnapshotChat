import ForumPosts from "./ForumPosts";
import CommentBox from "./CommentBox";
import ProposalCard from "./ProposalCard";

import { submit } from "../../utils/submit";
import { useGetProposalComments } from "../../hooks/useGetProposalComments";
import { Heading } from "../Generics/Headings/Heading";
import { Button } from "../Buttons/Button";
import {
  ascend,
  complement,
  descend,
  filter,
  gte,
  identity,
  lte,
  pipe,
  prop,
  sortWith,
} from "ramda";
import { useEffect, useState } from "react";

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
    title: "Token Holders",
    sort: (posts) =>
      posts &&
      sortWith([descend(pipe(prop("wallet"), prop("$KRAUSE")))])(posts),
  },
  {
    title: "Tickets",
    sort: (posts) =>
      posts && sortWith([ascend(pipe(prop("wallet"), prop("TICKETS")))])(posts),
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
      posts.filter(pipe(prop("wallet"), prop("teams"), prop("STEWARDS"))),
  },
];

export const useMultiselect = (items) => {
  const [selected, setSelected] = useState(items.map((item, i) => !i));
  const flipIndex = (index) => {
    setSelected((prevSelected) =>
      prevSelected.map((_, i) =>
        index === i ? !prevSelected[i] : prevSelected[i]
      )
    );
  };

  return [selected, flipIndex];
};

export default function Forum({
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
    <div className="flex flex-col space-y-4 p-6 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <ProposalCard
        proposal={proposal}
        setSelectedProposal={setSelectedProposal}
        posts={sortedPosts || posts}
      />
      <div className="flex flex-col space-y-6 p-6 bg-white rounded-lg border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <Heading title="Curate Quorum" size="lg" />
        <div className="flex flex-row space-x-2">
          {sortedPosts &&
            stats &&
            Object.keys(stats).map((key, i) => (
              <span
                key={i}
                className="bg-purple-100 text-purple-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-purple-200 dark:text-purple-900"
              >
                {`${key} ${stats[key]}`}
              </span>
            ))}
        </div>

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
        </div> */}
        <Heading title="Sort By" size="md" />
        <div className="flex flex-row space-x-3 flex-wrap">
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
        <div className="flex flex-row space-x-3 flex-wrap">
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
      <ForumPosts
        provider={provider}
        posts={sortedPosts || posts}
        submit={submit(signer)}
      />
      <CommentBox proposal={proposal} provider={provider} />
    </div>
  );
}
