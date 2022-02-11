import { Button } from "../../Buttons/Button";
import { Heading } from "../../Generics/Headings/Heading";
import { ProposalStats } from "./ProposalStats";
import { Badge } from "../../Generics/Badge";

export default function ProposalCard({ proposal, setSelectedProposal }) {
  return (
    <div className="flex flex-col space-y-6 p-6 bg-white rounded-lg border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <div>
        <div className="mb-2">
          {proposal.state === "active" ? (
            <Badge title="Active" color="yellow" />
          ) : (
            <Badge title="Closed" color="yellow" />
          )}
        </div>
        <Heading title={proposal.title} size="2xl" />
      </div>
      {/* <ProposalStats /> */}
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
        />
      </div>
    </div>
  );
}
