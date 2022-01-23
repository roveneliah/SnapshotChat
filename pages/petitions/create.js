import CreatePetitionPage from "../../components/CreatePetitionsPage";
import Web3Container from "../../components/Web3Container";

export default function CreatePetition() {
  return <Web3Container render={(props) => CreatePetitionPage({ ...props })} />;
}
