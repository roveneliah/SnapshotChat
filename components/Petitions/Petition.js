import { map, equals, sum, prop, compose, sortWith, ascend, propEq, complement } from "ramda";
import { useEffect, useState } from "react";
import { submit } from "../../utils/submit";
import { postSigner } from "../../utils/firestore";
import { Button } from "../Buttons/Button";
import ProposalCard from "../Forum/ProposalCard";
import { RelevantSigners } from "../Forum/ProposalCard/RelevantSigners";
import { Heading } from "../Generics/Headings/Heading";
import { PercentageBar } from "../Generics/PercentageBar";
import { SignatureList } from "./SignatureList";

const percentApproved = (signers) => signers && sum(map(({ status }) => equals("Approve", status))(signers)) / signers.length;

const signPetition = (s) => async (petition, status) => {
    if (!s) return;
    
    const connectedAddress = await s.getAddress();
    const msg = {
        petition: petition.title,
        status,
        signer: connectedAddress,
        requested: petition.signers != null && connectedAddress in petition.signers,
        name: `Rando #${Math.floor(69*Math.random())}`,
    }

    const signature = await submit(s)(JSON.stringify(msg))
    postSigner(petition)({ ...msg, signature })
}

export default function Petition({ signer, petition, back }) {

    const signers = petition.signers && Object.values(petition.signers);
    const requestedSigners = signers?.filter(propEq("requested", true))
    const otherSigners = signers?.filter(complement(propEq("requested", true)))
    console.log(otherSigners);

    return (
        <div className="flex flex-col space-y-4 p-6 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col space-y-6 p-6 bg-white rounded-lg border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700">
                <Heading title={petition.title} size="2xl" />
                <Heading title={petition.description} size="md" />
                <div className='flex flex-row space-x-3'>
                    {/* on sign, check if existing signer and update */}
                    <Button title="Back" color="red" onClick={back} />
                    {["Approve", "Against", "Abstain"].map(status => (
                        <Button title={status} onClick={async () => await signPetition(signer)(petition, status)}/>
                    ))}
                </div>
                {requestedSigners?.length > 0 && (
                    <div className="pt-10">
                        <Heading title="Requested Signers" size="xl" />
                        <PercentageBar title="" percentage={percentApproved(requestedSigners)} />
                        <SignatureList signers={requestedSigners}/>
                    </div>
                )}
                {otherSigners?.length > 0 && (
                    <div>
                        <Heading title={requestedSigners?.length > 0 ? "Other Signers" : "Signers"} size="lg" />
                        <SignatureList signers={otherSigners}/>
                    </div>
                )}
            </div>
            {/* <PetitionCard signer={signer} signers={signers} setSigners={setSigners} petition={petition} back={back} /> */}
        </div>
    );
}