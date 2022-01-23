import { ForumPage } from "../components/ForumPage";
import Web3Container from "../components/Web3Container";

export default function Delegates() {
  return (
    <Web3Container
      render={(props) =>
        ForumPage({ ...props, snapshotSpace: "delegates.krausehouse.eth" })
      }
    />
  );
}
