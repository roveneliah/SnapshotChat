import { Button } from "../../Buttons/Button";

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
