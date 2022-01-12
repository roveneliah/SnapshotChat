
import { Proposal } from "./Proposal"
export const ProposalsList = ({proposals, setSelectedProposal}) => proposals ? proposals.map(Proposal(setSelectedProposal)) : <></>
