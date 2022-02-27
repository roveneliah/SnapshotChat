import { Heading } from "../Generics/Headings/Heading";
import { AddressForm } from "./AddressForm";
import { TeamSelector } from "./TeamSelector";

export const AddSignersBox = ({ addSigners }) => (
  <div className="flex flex-col space-y-6 p-6 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
    <div>
      <Heading title="Requested Signers" size="lg" />
      <p className="leading-relaxed dark:text-gray-400">
        You can add individuals or curated teams of signers.
      </p>
    </div>
    <TeamSelector addSigners={addSigners} />
    <AddressForm addSigner={addSigners} />
  </div>
);
