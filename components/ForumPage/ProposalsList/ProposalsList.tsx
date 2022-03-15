import { ProposalListItem } from "./ProposalListItem";
import { Button } from "../../Buttons/Button";
import { useState } from "react";
import { HeadingFaint } from "../../Generics/Headings/HeadingFaint";
import {
  StreamTemplate,
  CustomTemplate,
} from "../../../hooks/firestore/useGetDrafts";
import { ProposalListHeader, ProposalStateFilter } from "./ProposalListHeader";
import { SubmitProposalCard } from "./SubmitProposalCard";
import { address } from "../../../hooks/web3/useGetWeb3";

type Template = StreamTemplate | CustomTemplate;

interface Props {
  connection: any;
  proposals: any;
  drafts: any;
  setSelectedProposal: any;
  userVotes: any;
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

  console.log(drafts);
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
          drafts.map((draft: Template, key: number) => (
            <div
              key={key}
              className="flex flex-col space-y-10 p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
            >
              <div>
                <div className="mb-2 flex flex-row space-x-2 pb-2">
                  <span
                    className={`bg-yellow-100 text-yellow-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900`}
                  >
                    Review
                  </span>
                </div>
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
