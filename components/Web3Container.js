import { useState, useEffect, cloneElement } from "react";
import { map } from "ramda";
import Layout from "./Layout";
import { EtherscanProvider } from "@ethersproject/providers";
import { connectWallet } from "../utils/connectWallet";
import { getKHWallet } from "../utils/getKHWallet";

export default function Web3Container({ render }) {
  // TODO: do I need all of these?
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();
  const [connected, setConnected] = useState(false);
  const [proposals, setProposals] = useState();
  const [selectedProposal, setSelectedProposal] = useState();
  const [wallet, setWallet] = useState({});
  const [hodler, setHodler] = useState(false);

  useEffect(() => setProvider(new EtherscanProvider()), []);
  useEffect(() => {
    const hasTicket = (wallet) => wallet?.TICKET > 0;
    const walletStuff = async () => {
      const address = await signer?.getAddress();
      const wallet = address && (await getKHWallet(provider)(address));
      setWallet(wallet);
      setHodler(hasTicket(wallet));
    };
    walletStuff();
  }, [signer]);

  return (
    <Layout
      connected={connected}
      connectWallet={connectWallet}
      setSigner={setSigner}
      setConnected={setConnected}
      setProvider={setProvider}
      wallet={wallet}
    >
      {render({
        provider,
        signer,
        connected,
        proposals,
        selectedProposal,
        wallet,
        hodler,
      })}
    </Layout>
  );
}
