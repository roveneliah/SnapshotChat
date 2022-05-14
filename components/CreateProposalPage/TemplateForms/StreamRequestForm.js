import { compose, prop } from "ramda";
import { Heading } from "../../Generics/Headings/Heading";
import { HeadingFaint } from "../../Generics/Headings/HeadingFaint";
import { SignatureList } from "../../PetitionsPage/Petitions/SignatureList";

export const StreamRequestForm = ({
  signers,
  title,
  updateTitle,
  recipientAddress,
  updateRecipientAddress,
  usdc,
  updateUsdc,
  krause,
  updateKrause,
  description,
  updateDescription,
}) => (
  <div className="flex h-min flex-col space-y-6 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
    <div className="flex flex-col space-y-1">
      <HeadingFaint title="Contributor..." size="xl" />
      <input
        value={title}
        onChange={updateTitle}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder="Recipient..."
      />
      <input
        value={recipientAddress}
        onChange={updateRecipientAddress}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder="Wallet (0x...)"
      />
    </div>
    <div className="flex flex-col space-y-1">
      <HeadingFaint title="...is requesting up to..." size="lg" />
      <input
        value={krause}
        onChange={updateKrause}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder="$KRAUSE / month"
      />
      <input
        value={usdc}
        onChange={updateUsdc}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder="$USDC / month"
      />
    </div>
    <div className="flex flex-col space-y-2">
      <HeadingFaint title="...for the following scope of work:" size="lg" />
      <textarea
        value={description}
        onChange={updateDescription}
        rows="4"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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
