import TeamsPage from "../components/TeamsPage";
import Web3Container from "../components/Web3Container";

export default function Home() {
  return <Web3Container render={(props) => TeamsPage({ ...props })} />;
}
