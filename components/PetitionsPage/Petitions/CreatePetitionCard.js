import { Button } from "../../Buttons/Button";

export function CreatePetitionCard() {
  return (
    <div className="mt-6 h-1/4 max-w-sm basis-1/4 rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Create a Petition
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Petitions are an open to anyone to gather grassroots support from
        community members.
      </p>
      <Button
        title={"Create a Petition"}
        color="purple"
        icon={true}
        href="/petitions/create"
      />
    </div>
  );
}
