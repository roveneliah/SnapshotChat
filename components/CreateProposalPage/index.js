import { useEffect, useState } from "react";

import { Heading } from "../Generics/Headings/Heading";
import { AddSignersBox } from "./AddSignersBox";
import { ProposalForm } from "./ProposalForm";
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
import { HeadingFaint } from "../Generics/Headings/HeadingFaint";
import { useForm } from "../../hooks/useForm";
import { Button } from "../Buttons/Button";

export default function CreateProposalPage(props) {
  // proposal form
  const [title, setTitle] = useState();
  const [recipientAddress, updateRecipientAddress] = useForm();
  const [usdc, updateUsdc] = useForm();
  const [krause, updateKrause] = useForm();
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

    console.log(petition);
    createPetition(petition);
  };

  const complete = (usdc || krause) && recipientAddress && title && description;
  return (
    <div className="flex flex-row space-x-3 justify-center">
      {ProposalForm({
        ...props,
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
        signers,
        submitPetition,
      })}
      {/* {AddSignersBox({ addSigners })} */}
      <div className="flex flex-col space-y-10 w-1/2 p-6 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-row justify-between">
          <Heading title="Preview" size="2xl" />
          {complete && (
            <div>
              <Button
                title="Submit"
                color="purple"
                onClick={submitPetition}
                icon={true}
              />
            </div>
          )}
        </div>
        {title && (
          <div>
            <HeadingFaint title="---" size="sm" />
            <Heading title={`${title} Contributor Funding Request`} size="lg" />
            <Heading title={recipientAddress || ""} size="sm" />
          </div>
        )}
        {(usdc || krause) && (
          <div>
            <HeadingFaint title="---" size="sm" />
            <HeadingFaint title="### Requesting up to.." size="lg" />
            <Heading title={usdc && `${usdc} $USDC / month`} size="sm" />
            <Heading title={krause && `${krause} $KRAUSE / month`} size="sm" />
            <HeadingFaint
              title="Paid bimonthly for 2 months. Stewardship team may cancel this agreement at any point. Community may submit a proposal to cancel this agreement at any point."
              size="sm"
            />
          </div>
        )}
        {description && (
          <div>
            <HeadingFaint title="---" size="sm" />
            <HeadingFaint title="### Scope of Work" size="lg" />
            <HeadingFaint
              title="A stream request is designed to give contributors freedom and encouragement to work across multiple domains across the DAO; however, here are the current main focuses / intentions:"
              size="sm"
            />
            <Heading title={description} size="sm" />
          </div>
        )}
        {complete && (
          <div>
            <HeadingFaint title="---" size="sm" />
            <HeadingFaint title="### Specification" size="lg" />
            <HeadingFaint
              title="This contributor may submit a request for up to the specified amount based on self-assessment of their work."
              size="sm"
            />
            <HeadingFaint title="### Intention" size="lg" />
            <HeadingFaint
              title="This is intended to encourage contributors to take immediate action on a wide range of problems/opportunities, as opposed to proceeding through the slower process of submitting a proposal for a narrow scope of work."
              size="sm"
            />
            <HeadingFaint
              title="We prefer to invest in and groom talent, giving them the freedom and capital they need to be entrepreneurs within our community.  We value self-starters who are able to take action and deliver quality work."
              size="sm"
            />
            <HeadingFaint
              title="### bUt SomEb0dY m1gHt t@kE t0o mUçh"
              size="lg"
            />
            <HeadingFaint
              title="Both the community and the Stewardship team has the power to cancel this stream if it is being abused.  In addition, if a contributor abuses this trust, they are effectively burning their social credibility and ability to successfully submit proposals in the future.  We expect some lossiness; however, we believe the benefits of getting good work off the ground is worth this small cost."
              size="sm"
            />
          </div>
        )}
      </div>
    </div>
  );
}
