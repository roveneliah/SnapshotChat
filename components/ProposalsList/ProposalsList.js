import { ProposalListItem } from "./ProposalListItem";

export const ProposalsList = ({ proposals, setSelectedProposal }) => (
  <div className="flex flex-col space-y-4 p-6 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
    {proposals.map((proposal, i) =>
      ProposalListItem({ setSelectedProposal, proposal, i })
    )}
  </div>
);
