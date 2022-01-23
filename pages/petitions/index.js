import { PetitionsPage } from "../../components/PetitionsPage";
import Web3Container from "../../components/Web3Container";

export default function Petitions() {
  return <Web3Container render={(props) => PetitionsPage({ ...props })} />;
}
