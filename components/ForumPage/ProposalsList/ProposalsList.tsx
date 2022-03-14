import { ProposalListItem } from "./ProposalListItem";
import { Button } from "../../Buttons/Button";
import { Badge } from "../../Generics/Badge";
import { useState } from "react";
import { HeadingFaint } from "../../Generics/Headings/HeadingFaint";
import { address } from "../../../hooks/web3/useGetWeb3";
import { VotedCard } from "../Forum/VotedCard";
import { StreamTemplate } from "../../../hooks/firestore/useGetDrafts";

function InfoCard() {
  return (
    <div className="p-6 h-1/4 basis-1/4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          The Watercooler
        </h5>
        <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">
          Krause House Governance Forum
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Add your take on a proposal, and follow individuals to curate the best
        information to help vet proposals.
      </p>
      <Button
        title={"Roadmap"}
        href="https://github.com/Krause-House/SnapshotChat"
        color="purple"
        icon={true}
        newTab={true}
        onClick={null}
      />
    </div>
  );
}

function SubmitProposalCard() {
  return (
    <div className="flex flex-col space-y-3 h-1/4">
      <div className="flex flex-col space-y-3 p-6 h-1/4 basis-1/4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div>
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Submit a Proposal
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Draft a proposal and collect signatures in support.
          </p>
        </div>
        <Button
          title={"Contributor Stream (Recommended)"}
          href="/stream"
          color="purple"
          icon={true}
          newTab={true}
          onClick={null}
        />
      </div>
    </div>
  );
}

enum ProposalStateFilter {
  None = "none",
  Review = "review",
  Active = "active",
  Closed = "closed",
}

// export const useEnum = (enumm: any, index: number = 0) => {
//   const [selected, setSelected] = useState(Object.keys(enumm)[index]);
//   const setByIndex = (i: number) => setSelected(Object.keys(enumm)[i]);
//   return {
//     selected,
//     setByIndex,
//     setSelected,
//   };
// };

interface Props {
  connection: any;
  proposals: any;
  drafts: any;
  setSelectedProposal: any;
  userVotes: any;
}

const { None, Review, Active, Closed } = ProposalStateFilter;
export function ProposalListHeader(props: any) {
  return (
    <div className="p-6 basis-1/4 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div>
        <h5 className="mb-2 min-h-max text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Proposals
        </h5>
      </div>
      <span
        onClick={() => props.setProposalStateFilter(None)}
        className="bg-gray-100 text-gray-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-200 dark:text-gray-900"
      >
        {props.proposalStateFilter === None ? "• All •" : "All"}
      </span>
      <span
        onClick={() => props.setProposalStateFilter(Review)}
        className="bg-yellow-100 text-yellow-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900"
      >
        {props.proposalStateFilter === Review ? "• Review •" : "Review"}
      </span>
      <span
        onClick={() => props.setProposalStateFilter(Active)}
        className="bg-green-100 text-green-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900"
      >
        {props.proposalStateFilter === Active ? "• Active •" : "Active"}
      </span>
      <span
        onClick={() => props.setProposalStateFilter(Closed)}
        className="bg-red-100 text-red-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900"
      >
        {props.proposalStateFilter === Closed ? "• Closed •" : "Closed"}
      </span>
      <div className="mt-5">
        {props.proposalStateFilter === Review && (
          <HeadingFaint
            size="sm"
            title="Proposals posted for review.  You can sign off on it to approve your support or pushback and advocate it moving to Snapshot."
          />
        )}
        {props.proposalStateFilter === Active && (
          <HeadingFaint
            size="sm"
            title="Proposals currently undergoing voting."
          />
        )}
        {props.proposalStateFilter === Closed && (
          <HeadingFaint
            size="sm"
            title="View the Treasury's transaction log to view transactions relevant to a proposal."
          />
        )}
      </div>
    </div>
  );
}

export default function ProposalsList({
  connection,
  proposals,
  drafts,
  setSelectedProposal,
  userVotes,
}: Props) {
  const { provider, userProfile, wallet } = connection;

  const [proposalStateFilter, setProposalStateFilter] =
    useState<ProposalStateFilter>(ProposalStateFilter.None);

  return (
    <div className="flex flex-row justify-center space-x-3">
      <SubmitProposalCard />
      <div className="basis-1/2 flex flex-col space-y-6 px-4 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <ProposalListHeader
          proposalStateFilter={proposalStateFilter}
          setProposalStateFilter={setProposalStateFilter}
        />
        {(proposalStateFilter === ProposalStateFilter.Review ||
          proposalStateFilter === ProposalStateFilter.None) &&
          drafts.map((draft: StreamTemplate, key: number) => (
            <div
              key={key}
              className="flex flex-col space-y-10 p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
            >
              <div>
                <div className="mb-2 flex flex-row space-x-2 pb-2">
                  <div>
                    <span
                      className={`bg-yellow-100 text-yellow-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900`}
                    >
                      Review
                    </span>
                  </div>
                </div>
                {/* <Heading title={proposal.title} size={"lg"} /> */}
                <HeadingFaint title={draft.title} size="xl" />
              </div>
              <div className="flex space-x-4">
                <Button
                  title="Forum"
                  color="hollow"
                  onClick={() => setSelectedProposal(draft.id)}
                />
              </div>
            </div>
          ))}
        {proposals
          .filter(
            ({ type }: any) => type === "basic" || type === "single-choice"
          )
          .filter(
            ({ state }: any) =>
              proposalStateFilter === ProposalStateFilter.None ||
              state === proposalStateFilter
          )
          .map((proposal: any, i: number) => (
            <ProposalListItem
              provider={provider}
              setSelectedProposal={setSelectedProposal}
              proposal={proposal}
              key={i}
              userVote={userVotes[proposal.id]}
              votesLoaded={userVotes != null}
              wallet={wallet}
              userProfile={userProfile}
            />
          ))}
      </div>
    </div>
  );
}
