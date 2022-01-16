import Head from 'next/head'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import { compose, gte, prop, map, filter, equals } from 'ramda'

import styles from '../styles/Home.module.css'
import { balanceOf } from '../utils/balanceOf'
import { getProposals } from '../utils/snapshot'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { ConnectButton } from '../components/ConnectButton'
import PostForm from '../components/PostForm'
import { proposalById } from '../utils/functional'
import { ViewProposalsButton } from '../components/ViewProposalsButton'
import { Wallet } from '../components/Wallet'
import { FullProposal } from '../components/FullProposal'
import { Posts } from '../components/Posts'
import { ProposalsList } from '../components/ProposalsList'
import { submit, submitPost } from '../utils/submit'
import { fetchWalletBalance } from '../utils/fetchWallet'

import {posts} from '../dummyData/posts'
import { $KRAUSE, CROWDFUND } from '../config'

export default function Vote() {

  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();
  const [connected, setConnected] = useState(false);
  const [proposals, setProposals] = useState()
  const [selectedProposal, setSelectedProposal] = useState();
  const [postText, setPostText] = useState("");
  const [wallet, setWallet] = useState({});

  useEffect(() => {
    getProposals().then(setProposals)
  }, [])

  useEffect(async () => {
    const getKrauseBalance = balanceOf(provider, $KRAUSE);
    const getTicketBalance = balanceOf(provider, CROWDFUND);
    signer?.getAddress().then(async (address) => {
      setWallet({
        $KRAUSE: await getKrauseBalance(address) / 1e18,
        TICKETS: await getTicketBalance(address)
      })
    })
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

  useEffect(() => {
    fetchWalletBalance(provider, signer)
      .then(setWallet)
  }, [])

  console.log("INDEX")
  console.log(wallet)
  console.log(signer)
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
              posts={posts}
              signer={signer}
              submit={submit(signer)}
              connected={connected}/>
          : <ProposalsList
              proposals={proposals}
              setSelectedProposal={setSelectedProposal}/>}
      </main>
      {/* <Footer /> */}
    </div>
  )
}
