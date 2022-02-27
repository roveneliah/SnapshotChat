import Link from "next/link";
import { useState, useEffect } from "react";
import { deletePetition } from "../../../utils/firestore";
import { Button } from "../../Buttons/Button";
import { Heading } from "../../Generics/Headings/Heading";
import { PetitionSignatureButtons } from "./PetitionSignatureButtons";

export function PetitionHeaderCard(props) {
  console.log(props.petition?.author);
  const [connectedAsAuthor, setConnectedAsAuthor] = useState(false);

  useEffect(() => {
    props.signer?.getAddress().then((address) => {
      const author = props.petition?.author;
      setConnectedAsAuthor(address === author);
    }, []);
  });

  return (
    <div>
      <Heading title={props.petition?.title} size="2xl" />
      <Heading title={props.petition?.description} size="md" />
      <div className="flex flex-row space-x-3">
        {connectedAsAuthor && (
          <Button
            title="Delete"
            onClick={() => {
              console.log("DELETE PETITION");
              // TODO: ADD MODAL
              deletePetition(props.petition);
              props.back();
            }}
          />
        )}
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
