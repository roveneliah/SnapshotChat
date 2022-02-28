import Markdown from "markdown-to-jsx";

import { Button } from "../../Buttons/Button";
import { Heading } from "../../Generics/Headings/Heading";
import { Badge } from "../../Generics/Badge";
import { HeadingFaint } from "../../Generics/Headings/HeadingFaint";
import { VotedCard } from "../Forum/VotedCard";

export const ProposalListItem = ({
  setSelectedProposal,
  proposal,
  key,
  userVote,
  votesLoaded,
  wallet,
}) => {
  return (
    <div
      key={key}
      className="flex flex-col space-y-10 p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
    >
      <div>
        <div className="mb-2 flex flex-row space-x-2 pb-2">
          {proposal.state === "active" ? (
            <div>
              <span
                className={`bg-green-100 text-green-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900`}
              >
                Active
              </span>
            </div>
          ) : (
            <div>
              <span
                className={`bg-red-100 text-red-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900`}
              >
                Closed
              </span>
            </div>
          )}
          <VotedCard
            choice={userVote}
            votesLoaded={votesLoaded}
            wallet={wallet}
          />
        </div>
        {/* <Heading title={proposal.title} size={"lg"} /> */}
        <HeadingFaint title={proposal.title} size="xl" />
      </div>
      <div className="flex space-x-4">
        <Button
          title="Forum"
          color="hollow"
          onClick={() => setSelectedProposal(proposal.id)}
        />
        <Button
          title="View On Snapshot"
          icon={true}
          color="hollow"
          href={`https://snapshot.org/#/krausehouse.eth/proposal/${proposal.id}`}
          newTab={true}
        />
      </div>
    </div>
  );
};
