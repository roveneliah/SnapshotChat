
import { Proposal } from "./Proposal"
export const ProposalsList = ({proposals, setSelectedProposal}) => 
    proposals 
        ? (
            <div className="flex flex-col space-y-5 p-4">
                {proposals.map(Proposal(setSelectedProposal))}
            </div>
        )
        : <></>
