import { ProposalListItem } from "./ProposalListItem";
import { Button } from "../Buttons/Button";

export const ProposalsList = ({ proposals, setSelectedProposal }) => (
  <div className="flex flex-row justify-center space-x-3">
    <div className="p-6 h-1/4 mt-6 basis-1/5 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Write a Proposal
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Community members can submit proposals for review to the Stewardship
        team for review.
      </p>
      <Button title={"Create a Proposal"} color="purple" icon={true} />
    </div>
    <div className="basis-2/5 flex flex-col space-y-6 p-6 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      {proposals
        .filter(({ type }) => (type === "basic") | (type === "single-choice"))
        .map((proposal, i) =>
          ProposalListItem({ setSelectedProposal, proposal, i })
        )}
    </div>
  </div>
);
