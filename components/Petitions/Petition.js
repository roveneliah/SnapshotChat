import { map, equals, sum, propEq, complement } from "ramda";
import { PetitionHeaderCard } from "./PetitionHeaderCard";
import { SignersTable } from "./SignersTable";

export const percentApproved = (signers) =>
  signers &&
  sum(map(({ status }) => equals("Approve", status))(signers)) / signers.length;

export default function Petition({ signer, petition, back }) {
  // TODO: clean this up
  const signers = petition.signers && Object.values(petition.signers);
  const requestedSigners = signers?.filter(propEq("requested", true));
  const otherSigners = signers?.filter(complement(propEq("requested", true)));

  return (
    <div className="flex flex-col space-y-4 p-6 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col space-y-6 p-6 bg-white rounded-lg border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <PetitionHeaderCard signer={signer} petition={petition} back={back} />

        <SignersTable
          title="Requested Signers"
          signers={requestedSigners}
          progressBar={true}
        />
        <SignersTable title="Other Signers" signers={otherSigners} />
      </div>
    </div>
  );
}
