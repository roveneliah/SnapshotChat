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

import {posts} from '../dummyData/posts'

export default function Vote() {

  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();
  const [connected, setConnected] = useState(false);
  const [proposals, setProposals] = useState()
  const [selectedProposal, setSelectedProposal] = useState();
  const [postText, setPostText] = useState("");

  useEffect(() => {
    getProposals().then(setProposals)
  }, [])

  
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
    <div className={styles.container}>
      <Head>
        <title>Krause House</title>
        <meta name="description" content="web3's Home Team" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />      
        {!connected && <ConnectButton connect={connect} setSigner={setSigner}/>}
        {connected && <Wallet provider={provider} signer={signer}/>}


        {selectedProposal && <ViewProposalsButton setSelectedProposal={setSelectedProposal}/>}
        {selectedProposal 
          ? <FullProposal proposal={proposalById(proposals, selectedProposal)}/>
          : <ProposalsList proposals={proposals} setSelectedProposal={setSelectedProposal}/>}


        {/* Posts */}
        {connected && <PostForm postText={postText} setPostText={setPostText} submitPost={() => submitPost(signer)(postText)}/>}
        {selectedProposal && <Posts posts={posts} submit={submit(signer)} connected={connected}/>}
      </main>
      <Footer />
    </div>
  )
}
