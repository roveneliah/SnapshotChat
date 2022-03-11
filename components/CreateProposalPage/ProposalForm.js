import Link from "next/link";
import { compose, prop } from "ramda";
import { Button } from "../Buttons/Button";
import { Heading } from "../Generics/Headings/Heading";
import { HeadingFaint } from "../Generics/Headings/HeadingFaint";
import { SignatureList } from "../PetitionsPage/Petitions/SignatureList";

export const ProposalForm = ({
  signers,
  title,
  setTitle,
  recipientAddress,
  updateRecipientAddress,
  usdc,
  updateUsdc,
  krause,
  updateKrause,
  description,
  setDescription,
}) => (
  <div className="flex flex-col w-1/2 h-min space-y-6 p-6 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
    <div className="flex flex-col space-y-1">
      <HeadingFaint title="Contributor..." size="xl" />
      <input
        value={title}
        onChange={compose(setTitle, prop("value"), prop("target"))}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Recipient..."
      />
      <input
        value={recipientAddress}
        onChange={updateRecipientAddress}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Wallet (0x...)"
      />
    </div>
    <div className="flex flex-col space-y-1">
      <HeadingFaint title="...is requesting up to..." size="lg" />
      <input
        value={krause}
        onChange={updateKrause}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="$KRAUSE / month"
      />
      <input
        value={usdc}
        onChange={updateUsdc}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="$USDC / month"
      />
    </div>
    <div className="flex flex-col space-y-2">
      <HeadingFaint title="...for the following scope of work:" size="lg" />
      <textarea
        value={description}
        onChange={compose(setDescription, prop("value"), prop("target"))}
        rows="4"
        className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="[please keep as brief and specific as possible, focus on actions and intentions as opposed to outcomes]"
      />
    </div>
    {signers?.length > 0 && (
      <div>
        <Heading title="Signers" size="xl" />
        <SignatureList signers={signers} />
      </div>
    )}
  </div>
);
