import { Button } from "../../Buttons/Button";
import { Heading } from "../../Generics/Headings/Heading";
import { ProposalStats } from "./ProposalStats";

export default function ProposalCard({ proposal, setSelectedProposal }) {
    return (
        <div className="flex flex-col space-y-6 p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <Heading title={proposal.title} size="xl" />
            <ProposalStats />
            <div className='flex flex-row space-x-2'>
                <Button title="Back" color="purple" onClick={() => setSelectedProposal(null)} />
                <Button title="View on Snapshot" icon={true} href={`https://snapshot.org/#/krausehouse.eth/proposal/${proposal.id}`}/>
            </div>
      </div>
    )
}