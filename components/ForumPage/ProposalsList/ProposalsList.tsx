import { ProposalListItem } from "./ProposalListItem";
import { useState } from "react";
import { ProposalListHeader } from "./ProposalListHeader";
import { ProposalStateFilter } from "../../../types/ProposalStateFilter";
import { SubmitProposalCard } from "./SubmitProposalCard";
import { ViewProfileCard } from "./ViewProfileCard";
import { SubmitViaNotionCard } from "./SubmitViaNotionCard";
import { Col } from "../../Generics/Col";
import { Row } from "../../Generics/Row";
import { ProfileView } from "../../ProfilePage/ProfileView";
import UserProfileCard from "../../ProfilePage/UserProfileCard";
import { Heading } from "../../Generics/Headings/Heading";
import Image from "next/image";

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
  // drafts,
  setSelectedProposal,
  userVotes,
}: Props) {
  const { provider, userProfile, wallet } = connection;

  const [proposalStateFilter, setProposalStateFilter] =
    useState<ProposalStateFilter>(ProposalStateFilter.None);

  const proposalsList = proposals
    .filter(({ type }: any) => type === "basic" || type === "single-choice")
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
        index={i}
        userVote={userVotes[proposal.id]}
        votesLoaded={userVotes != null}
        wallet={wallet}
        userProfile={userProfile}
      />
    ));

  return (
    <Row space={3} className="justify-center py-8">
      <div className="w-3/4 grid grid-cols-1 lg:grid-cols-5 px-4">
        <div className="col-span-2 p-4 space-y-3 h-fit">
          <ProposalListHeader
            proposalStateFilter={proposalStateFilter}
            setProposalStateFilter={setProposalStateFilter}
          />
        </div>
        <div className="col-span-3 basis-3/4 lg:basis-1/2 flex flex-col space-y-6 p-4 max-h-[87vh] overflow-auto  border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          {/* {(proposalStateFilter === ProposalStateFilter.Review ||
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
          ))} */}

          {proposalsList.length > 0 ? (
            proposalsList
          ) : (
            <div className="flex flex-col space-y-5 p-6 bg-cards font-krausehouse2 bg-opacity-75 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <div>
                <Heading title="No proposals found" size="xl" />
              </div>
              <div>
                <Image
                  src="/cube.gif"
                  height={900}
                  width={1200}
                  className="rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Row>
  );
}
