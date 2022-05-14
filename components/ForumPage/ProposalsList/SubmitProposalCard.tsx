import { Button } from "../../Buttons/Button";

export function SubmitProposalCard() {
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex max-w-sm basis-1/4 flex-col space-y-3 rounded-lg border border-gray-200 bg-white p-6 shadow-md">
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
          title={"Templates"}
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
