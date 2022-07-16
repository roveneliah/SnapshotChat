import { Button } from "../../Buttons/Button";

export const SubmitViaNotionCard = () => (
  <div className="flex flex-col space-y-3">
    <div className="flex max-w-sm basis-1/4 flex-col space-y-3 rounded-lg border border-gray-200 bg-white p-6 shadow-md">
      <div>
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Submit a Proposal
          </h5>
        </a>
        {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Draft a proposal in Notion.
        </p> */}
      </div>
      <Button
        title={"Templates"}
        href="https://krausehousework.notion.site/Submit-a-Proposal-fcf858c80a0c40b6a2a83aec5ed588dc"
        color="purple"
        icon={true}
        newTab={true}
        onClick={null}
      />
    </div>
  </div>
);
