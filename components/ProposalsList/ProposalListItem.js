import Markdown from "markdown-to-jsx";

import { Button } from "../Buttons/Button";
import { Heading } from "../Generics/Headings/Heading";

export const ProposalListItem = ({ setSelectedProposal, proposal, key }) => (
  <div
    key={key}
    className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
  >
    <Heading title={proposal.title} size={"2xl"} />
    {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
      <Markdown>
        {body}
      </Markdown>
    </p> */}
    <div className="flex space-x-4">
      <Button title="Forum" onClick={() => setSelectedProposal(proposal.id)} />
      <Button
        title="View On Snapshot"
        icon={true}
        href={`https://snapshot.org/#/krausehouse.eth/proposal/${proposal.id}`}
      />
    </div>
  </div>
);
