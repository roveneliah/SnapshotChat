import { Button } from "../Buttons/Button";
import { Heading } from "../Generics/Headings/Heading";
import { PetitionSignatureButtons } from "./PetitionSignatureButtons";

export function PetitionHeaderCard(props) {
  return (
    <div>
      <Heading title={props.petition.title} size="2xl" />
      <Heading title={props.petition.description} size="md" />
      <div className="flex flex-row space-x-3">
        <Button title="Back" color="red" onClick={props.back} />

        {/* TODO: REPLACE WITH A SELECTOR */}
        <PetitionSignatureButtons
          signer={props.signer}
          petition={props.petition}
        />
      </div>
    </div>
  );
}
