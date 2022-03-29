import Layout from "./Layout";
import { connectWallet, disconnectWallet } from "../utils/web3/connectWallet";
import { useGetWeb3 } from "../hooks/web3/useGetWeb3";
import { Connection } from "../types/Connection";

export default function Web3Container({ render }: { render: Function }) {
  const connection: Connection = useGetWeb3();

  return (
    <Layout
      connect={connectWallet(connection.setProvider)}
      disconnect={disconnectWallet(connection.provider, connection.setProvider)}
      wallet={connection.wallet}
      wrongNetwork={connection.wrongNetwork}
    >
      {render(connection)}
    </Layout>
  );
}
