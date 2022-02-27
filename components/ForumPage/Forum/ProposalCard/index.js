import { Button } from "../../../Buttons/Button";
import { Heading } from "../../../Generics/Headings/Heading";
import { ProposalStats } from "./ProposalStats";
import { Badge } from "../../../Generics/Badge";
import { toPercentStr } from "../../../../utils/functional";
import { VotedCard } from "..";

export default function ProposalCard({
  proposal,
  setSelectedProposal,
  selectedVote,
  setSelectedVote,
  userVote,
  votesLoaded,
  wallet,
}) {
  return (
    <div className="flex flex-col space-y-6 p-6 bg-white rounded-lg border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <div>
        <div className="mb-2 flex flex-row space-x-2">
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
        <Heading title={proposal.title} size="2xl" />
      </div>
      {/* <ProposalStats /> */}
      <div>
        <span className="bg-purple-100 text-purple-800 text-lg font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-purple-200 dark:text-purple-900">
          {proposal.votes} Votes
        </span>
        <span className="bg-purple-100 text-purple-800 text-lg font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-purple-200 dark:text-purple-900">
          ~{Math.floor(proposal.scores_total)} $KRAUSE Total
        </span>
      </div>
      <div
        className={
          proposal.choices.length % 2 ? "grid grid-cols-3" : "grid grid-cols-2"
        }
      >
        {proposal.choices.map((choice, i) => (
          <a
            onClick={() => setSelectedVote(selectedVote === i ? null : i)}
            className={
              selectedVote === i
                ? "block p-6 m-2 rounded-lg border shadow-md bg-gray-100 dark:border-gray-700 dark:bg-gray-700"
                : "block p-6 m-2 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
            }
            key={i}
          >
            <div className="flex flex-row space-x-1">
              <div>
                <span
                  className={`bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900`}
                >
                  {toPercentStr(proposal.scores[i] / proposal.scores_total)}
                </span>
              </div>
              <Heading title={choice} size="md" />
            </div>
            <span className="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-200 dark:text-gray-900">
              {Math.floor(proposal.scores[i])} $KRAUSE
            </span>
          </a>
        ))}
      </div>
      <div className="flex flex-row space-x-2">
        <Button
          title="Back"
          color="hollow"
          onClick={() => setSelectedProposal(null)}
        />
        <Button
          title="View on Snapshot"
          icon={true}
          color="hollow"
          href={`https://snapshot.org/#/krausehouse.eth/proposal/${proposal.id}`}
          newTab={true}
        />
      </div>
    </div>
  );
}
