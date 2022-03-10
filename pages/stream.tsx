import CreateProposalPage from "../components/CreateProposalPage";
import Web3Container from "../components/Web3Container";

export default function CreateProposal() {
  return (
    <Web3Container render={(props: any) => CreateProposalPage({ ...props })} />
  );
}
