import { useState, useEffect } from 'react'
import { AlchemyProvider, EtherscanProvider } from '@ethersproject/providers'

// Components
import { Header } from '../components/Header'
import { printPass, proposalById } from '../utils/functional'
import Forum from '../components/Forum'
import { ProposalsList } from '../components/ProposalsList/ProposalsList'
import Layout from '../components/Layout'

// Functions
import { submit } from '../utils/submit'
import { fetchProposals } from '../utils/snapshot'
import { getKHWallet } from '../utils/getKHWallet'
import { connectWallet } from '../utils/connectWallet'
import { balanceOf } from '../utils/balanceOf'
import { addPost, writeTest, writeProposal, updateProposal } from '../utils/firestore'
import { composeP } from '../utils/functional'
import { compose, map } from 'ramda'


export default function Vote() {

  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();
  const [connected, setConnected] = useState(false);
  const [proposals, setProposals] = useState()
  const [selectedProposal, setSelectedProposal] = useState();
  const [wallet, setWallet] = useState({});
  const [hodler, setHodler] = useState(false);

  const updateDb = map(updateProposal);
  const proposalStuff = () => {
    proposals || 
      fetchProposals()
      .then((proposals) => {
        updateDb(proposals);        // update in firebase
        setProposals(proposals);    // setProposals in state
      });
  }
  
  // don't want to do repeat work after each rerender if we already have the data, right?
  // how to know when to call db or not? how do we know when it's wiped?
  const hasTicket = (wallet) => wallet?.TICKET > 0;
  const walletStuff = async () => {
    const address = await signer?.getAddress();
    const wallet = address && await getKHWallet(provider)(address)
    setWallet(wallet);
    setHodler(hasTicket(wallet));
  }
  
  useEffect(() => setProvider(new EtherscanProvider()), [])
  useEffect(proposalStuff);
  useEffect(walletStuff, [signer])

  const header = () => (
    <Header
      connected={connected}
      connect={connectWallet({setSigner, setProvider, setConnected})}
      signer={signer}
      setSigner={setSigner}
      wallet={wallet}/>
  )

  const forum = () => (
    <Forum
      proposal={proposalById(proposals, selectedProposal)}
      setSelectedProposal={setSelectedProposal}
      signer={signer}
      submit={submit(signer)}
      hodler={hodler}
      connected={connected}
      provider={provider}/>
  )

  const proposalsList = () => (
    <ProposalsList
      proposals={proposals}
      setSelectedProposal={setSelectedProposal}/>
  )

  return (
    <Layout>
      {header()}
      {selectedProposal 
        ? forum()
        : proposals && proposalsList()}
    </Layout>
  )
}
