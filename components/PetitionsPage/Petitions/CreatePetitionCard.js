import { Button } from "../../Buttons/Button";

export function CreatePetitionCard() {
  return (
    <div className="p-6 h-1/4 mt-6 basis-1/4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
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
