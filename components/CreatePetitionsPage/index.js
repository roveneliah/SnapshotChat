import { useEffect, useState } from "react";

import { Heading } from "../Generics/Headings/Heading";
import { AddSignersBox } from "./AddSignersBox";
import { PetitionPreview } from "./PetitionPreview";
import {
  any,
  compose,
  eqProps,
  map,
  concat,
  filter,
  mergeLeft,
  pipe,
  none,
  reduce,
} from "ramda";
import { createPetition } from "../../utils/firestore";
import { signMessage } from "../../utils/web3/submit";
import { useForm } from "../../hooks/useForm";

export default function CreatePetitionPage(props) {
  // proposal form
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [signers, setSigners] = useState([]);

  const isNewSigner = (existing) => (signer) =>
    none(eqProps("address", signer))(existing);

  const addRequestedFields = mergeLeft({
    status: "Pending",
    requested: true,
  });

  const addSigners = (requestedSigners) => {
    setSigners((existingSigners) =>
      concat(
        pipe(
          filter(isNewSigner(existingSigners)),
          map(addRequestedFields)
        )(requestedSigners)
      )(existingSigners)
    );
  };

  const submitPetition = async () => {
    if (!props.hodler) return;

    const petition = await signMessage(props.signer)({
      title: title || "",
      description: description || "",
      signers: signers.reduce(
        (acc, signer) => ({ ...acc, [signer.address]: signer }),
        {}
      ),
      author: await props.signer.getAddress(),
      id: `${Math.floor(Math.random() * 1000)}`,
    });

    createPetition(petition);
  };

  return (
    <div className="flex flex-row justify-center">
      <div className="flex flex-col space-y-12 rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
        <div className="flex flex-col space-y-6 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <Heading title="Create a petition." size="2xl" />
          <Heading
            title="Petitions allow you to request signatures from specific people to demonstrate support for a sentiment, initiative, or specific request."
            size="lg"
          />
          <Heading title="Uses" size="lg" />
          <p className="leading-relaxed dark:text-gray-400">
            1. Use as legitimacy in more formal proposals.
          </p>
          <p className="leading-relaxed dark:text-gray-400">
            2. Demonstrate grassroots social support for removing an existing
            governance/power structure.
          </p>
          <p className="leading-relaxed dark:text-gray-400">
            3. Gather advice/feedback from curated parties.
          </p>
          <Heading title="Examples" size="lg" />
          <p className="leading-relaxed dark:text-gray-400">
            1. To demonstrate support for my budget proposal, I could get sign
            off from the dev team.
          </p>
          <p className="leading-relaxed dark:text-gray-400">
            2. As a newcomer looking for full-time work, I could get sign off
            from industry experts or coworkers.
          </p>
          <p className="leading-relaxed dark:text-gray-400">
            3. To advocate we rally around Australian teams, I might get sign
            off from NBL leaders or high school players considering going
            overseas.
          </p>
        </div>
        {PetitionPreview({
          ...props,
          title,
          setTitle,
          description,
          setDescription,
          signers,
          submitPetition,
        })}
        {AddSignersBox({ addSigners })}
      </div>
    </div>
  );
}
