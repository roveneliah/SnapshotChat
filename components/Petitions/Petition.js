import { map, equals, sum, prop, compose, sortWith, ascend } from "ramda";
import { useState } from "react";
import { submit } from "../../utils/submit";
import { Button } from "../Buttons/Button";
import ProposalCard from "../Forum/ProposalCard";
import { RelevantSigners } from "../Forum/ProposalCard/RelevantSigners";
import { Heading } from "../Generics/Headings/Heading";
import { PercentageBar } from "../Generics/PercentageBar";
import { SignatureList } from "./SignatureList";

const percentApproved = (signers) => sum(map(({ status }) => equals("Approve", status))(signers)) / signers.length;

export default function Petition({ signer, petition, back }) {

    const [signers, setSigners] = useState([{
        signer: "Lebron.eth",
        address: process.env.NEXT_PUBLIC_ADDR1,
        status: "Approve",
    }, {
        signer: "Alex Caruso",
        address: process.env.NEXT_PUBLIC_ADDR2,
        status: "Approve",
    }, {
        signer: "Slim Reaper",
        status: "Approve",
    }, {
        signer: "Dinwiddie",
        status: "Against",
    }, {
        signer: "Kyrie",
        status: "Abstain",
    }, {
        signer: "Bill Russell",
        status: "Pending",
    }])

    const sign = (s) => async (status) => {
        const connectedAddress = await s.getAddress();
        const signature = await submit(s)(JSON.stringify({
            petition,
            status,
            signer: connectedAddress,
        }))
        
        // update status
        const updateStatus = signer => signer.address !== connectedAddress ? signer : { ...signer, status, signature }
        setSigners(signers.map(updateStatus));
    }

    return (
        <div className="flex flex-col space-y-4 p-6 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col space-y-6 p-6 bg-white rounded-lg border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700">
                <Heading title={petition.title} size="2xl" />
                <Heading title={petition.description} size="lg" />
                <div className='flex flex-row space-x-3'>
                    {/* on sign, check if existing signer and update */}
                    <Button title="Back" color="red" onClick={back} />
                    {["Approve", "Against", "Abstain"].map(status => (
                        <Button title={status} onClick={async () => signer && await sign(signer)(status)}/>
                    ))}
                </div>
                <PercentageBar title="Signers" percentage={percentApproved(signers)} />
                <SignatureList signers={signers}/>
            </div>
            {/* <PetitionCard signer={signer} signers={signers} setSigners={setSigners} petition={petition} back={back} /> */}
        </div>
    );
}