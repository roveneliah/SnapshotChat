import Head from 'next/head'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import { AlchemyProvider, EtherscanProvider } from '@ethersproject/providers'

import { balanceOf } from '../utils/balanceOf'
import { getProposals } from '../utils/snapshot'
import { Header } from '../components/Header'
import { printPass, proposalById } from '../utils/functional'
import { FullProposal } from '../components/FullProposal'
import { ProposalsList } from '../components/ProposalsList'
import { submit } from '../utils/submit'
import { getKHWallet } from '../utils/getKHWallet'

import { addPost, writeTest, writeProposal, setProposal } from '../utils/firestore'

export default function Vote() {

  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();
  const [connected, setConnected] = useState(false);
  const [proposals, setProposals] = useState()
  const [selectedProposal, setSelectedProposal] = useState();
  const [wallet, setWallet] = useState({});
  const [hodler, setHodler] = useState(false);

  useEffect(() => {
    setProvider(new EtherscanProvider());

    // load in proposal from firebase
    getProposals().then((proposals) => {
      proposals.map(setProposal);
      setProposals(proposals);
    });
  }, [])

  useEffect(async () => {

    const address = await signer?.getAddress();
    const wallet = address && await getKHWallet(provider)(address)
    setWallet(wallet);
    setHodler(wallet?.TICKETS > 0);

  }, [signer])

  
  const connect = async (setSigner) => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        // options: {
        //   infuraId: "INFURA_ID" // required
        // }
      }
    }
    const web3Modal = new Web3Modal({ providerOptions, theme: "dark" });
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    setProvider(provider);
    setSigner(provider.getSigner())
    setConnected(true);
  }


  return (
    <div className="bg-gray-800 h-max">
      <Head>
        <title>Krause House</title>
        <meta name="description" content="web3's Home Team" />
        <link rel="icon" href="/kh_holo.png" />
      </Head>
      <main>
        <Header
          connected={connected}
          connect={connect}
          signer={signer}
          setSigner={setSigner}
          wallet={wallet}/>
        
        {selectedProposal 
          ? <FullProposal
              proposal={proposalById(proposals, selectedProposal)}
              setSelectedProposal={setSelectedProposal}
              signer={signer}
              submit={submit(signer)}
              hodler={hodler}
              connected={connected}
              provider={provider}/>
          : <ProposalsList
              proposals={proposals}
              setSelectedProposal={setSelectedProposal}/>}
      </main>
      {/* <Footer /> */}
    </div>
  )
}
