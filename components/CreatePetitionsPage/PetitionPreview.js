import Link from "next/link";
import { compose, prop } from "ramda";
import { Button } from "../Buttons/Button";
import { Heading } from "../Generics/Headings/Heading";
import { SignatureList } from "../PetitionsPage/Petitions/SignatureList";

const canPetition = (wallet) => wallet?.TICKETS > 0;
export const PetitionPreview = ({
  submitPetition,
  signers,
  title,
  setTitle,
  description,
  setDescription,
  wallet,
}) => (
  <div className="flex flex-col space-y-6 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
    <div>
      <Heading title="Petition" size="xl" />
      <input
        value={title}
        onChange={compose(setTitle, prop("value"), prop("target"))}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder="Let's do something..."
      />
    </div>
    <div>
      <Heading title="Details" size="lg" />
      <textarea
        value={description}
        onChange={compose(setDescription, prop("value"), prop("target"))}
        rows="4"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder="Because..."
      ></textarea>
    </div>
    {signers?.length > 0 && (
      <div>
        <Heading title="Signers" size="xl" />
        <SignatureList signers={signers} />
      </div>
    )}
    {canPetition(wallet) ? (
      <Link href="/petitions" passHref>
        <Button
          title="Submit"
          icon={true}
          color="purple"
          onClick={submitPetition}
        />
      </Link>
    ) : (
      <div
        className="mb-4 rounded-lg bg-gray-100 p-4 text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-300"
        role="alert"
      >
        <span className="font-medium">
          At the moment, only KRAUSE or Ticket holders can create a petition.
        </span>
      </div>
    )}
  </div>
);
