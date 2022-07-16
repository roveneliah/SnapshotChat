import { Button } from "../../Buttons/Button";

function InfoCard() {
  return (
    <div className="h-1/4 max-w-sm basis-1/4 rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          The Watercooler
        </h5>
        <h5 className="text-md mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
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
