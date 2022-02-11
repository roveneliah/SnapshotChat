import Markdown from "markdown-to-jsx";

import { Button } from "../Buttons/Button";
import { Heading } from "../Generics/Headings/Heading";
import { Badge } from "../Generics/Badge";

export const ProposalListItem = ({ setSelectedProposal, proposal, key }) => {
  return (
    <div
      key={key}
      className="flex flex-col space-y-10 p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
    >
      <div>
        <div className="mb-2">
          {proposal.state === "active" ? (
            <Badge title="Active" color="yellow" />
          ) : (
            <Badge title="Closed" color="yellow" />
          )}
        </div>
        <Heading title={proposal.title} size={"xl"} />
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
        />
      </div>
    </div>
  );
};
