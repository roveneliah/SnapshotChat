import { useState, useEffect } from "react";
import { AlchemyProvider, EtherscanProvider } from "@ethersproject/providers";

// Components
import { printPass, proposalById } from "../utils/functional";
import Forum from "../components/Forum";
import { ProposalsList } from "../components/ProposalsList/ProposalsList";
import Layout from "../components/Layout";

// Functions
import { submit } from "../utils/submit";
import { fetchProposals } from "../utils/Snapshot/fetch";
import { getKHWallet } from "../utils/getKHWallet";
import { connectWallet } from "../utils/connectWallet";
import {
  addPost,
  writeTest,
  writeProposal,
  updateProposal,
} from "../utils/firestore";
import { compose, map } from "ramda";

// const snapshotSpace = "krausehouse.eth"
export default function Vote({ snapshotSpace = "krausehouse.eth" }) {
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();
  const [connected, setConnected] = useState(false);
  const [proposals, setProposals] = useState();
  const [selectedProposal, setSelectedProposal] = useState();
  const [wallet, setWallet] = useState({});
  const [hodler, setHodler] = useState(false);

  const updateDb = map(updateProposal);
  const proposalStuff = () => {
    proposals ||
      fetchProposals(snapshotSpace).then((proposals) => {
        updateDb(proposals); // update in firebase
        setProposals(proposals); // setProposals in state
      });
  };

  // don't want to do repeat work after each rerender if we already have the data, right?
  // how to know when to call db or not? how do we know when it's wiped?
  const hasTicket = (wallet) => wallet?.TICKET > 0;

  useEffect(() => setProvider(new EtherscanProvider()), []);
  useEffect(proposalStuff);
  useEffect(() => {
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
      {selectedProposal ? (
        <Forum
          proposal={proposalById(proposals, selectedProposal)}
          setSelectedProposal={setSelectedProposal}
          signer={signer}
          submit={submit(signer)}
          hodler={hodler}
          connected={connected}
          provider={provider}
        />
      ) : (
        proposals && (
          <ProposalsList
            proposals={proposals}
            setSelectedProposal={setSelectedProposal}
          />
        )
      )}
    </Layout>
  );
}
