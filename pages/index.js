import { ForumPage } from "../components/ForumPage";
import Web3Container from "../components/Web3Container";

export default function Home() {
  return (
    <Web3Container
      render={(props) =>
        ForumPage({ ...props, snapshotSpace: "krausehouse.eth" })
      }
    />
  );
}
