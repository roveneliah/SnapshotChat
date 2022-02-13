import Web3Container from "../components/Web3Container";
import { ProfilePage } from "../components/ProfilePage";

export default function Profile() {
  return <Web3Container render={(props) => ProfilePage(props)} />;
}
