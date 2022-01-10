import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import { $KRAUSE, balanceOfAbi, CROWDFUND } from '../config'
import { compose, gte, prop, map, filter, equals } from 'ramda'
import { getProposals } from '../utils/snapshot'
import Markdown from 'markdown-to-jsx'

export default function Vote() {

  const [krauseBalance, setKrauseBalance] = useState();
  const [ticketBalance, setTicketBalance] = useState();
  const [connected, setConnected] = useState(false);
  const [signer, setSigner] = useState();
  const [proposals, setProposals] = useState()
  const [selectedProposal, setSelectedProposal] = useState();

  useEffect(() => {
    getProposals().then(setProposals)
  }, [])

  const balanceOf = (provider, contractAddress) => async (address) => {
    const contract = new ethers.Contract(contractAddress, balanceOfAbi, provider);
    return await contract.balanceOf(address).then(x => x.toString());
  }

  // connect
  const connect = async () => {
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
    setSigner(provider.getSigner());
    console.log(signer)
    const address = await signer.getAddress()
    

    const getKrauseBalance = balanceOf(provider, $KRAUSE); 
    const getCrowdfundBalance = balanceOf(provider, CROWDFUND);

    
    // woah so we can verify that the person is a token holder when we do something with this...
    // we'd store the messages
    
    setKrauseBalance(await getKrauseBalance(address));
    setTicketBalance(await getCrowdfundBalance(address));
    setConnected(true);
  }

  const ifHodler = async () => signer.getAddress().then(getKrauseBalance).then(gte(100));
  const submitPost = async () => {
    // check if this person has a token balance
    const signature = await signer.signMessage(postText);
    console.log(signature);
    console.log(ethers.utils.verifyMessage(msg, signature));
  }

  

  const head = (arr) => arr ? arr[0] : null;
  const proposalById = (proposals, id) => head(proposals.filter(compose(equals(id), prop("id"))))

  const fullProposal = ({ title, author, id, body }) => (
    <div>
      <h1>{title}</h1>
      <Markdown>{body}</Markdown>
    </div>
  )

  const proposalsList = () => (
    <p>{proposals && proposals.map(formatProposal)}</p>
  )

  const formatProposal = ({ title, author, id, body }) => (
    <>
      <h2 onClick={() => setSelectedProposal(id)}>{title}</h2>
      <h5>{author}</h5>
      <a href={`https://snapshot.org/#/krausehouse.eth/proposal/${id}`}>
        View on Snapshot
      </a>
      <br/>
      <button onClick={() => setSelectedProposal(id)}>Select</button>
      <br/><br/> 
    </>
  )
  

  return (
    <div className={styles.container}>
      <Head>
        <title>Krause House</title>
        <meta name="description" content="web3's Home Team" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="" style={{color: "purple"}}>🏀 The Front Office</a>
        </h1>
      
        {!connected && <button onClick={connect}>
          Connect
        </button>}

        {connected && <h1>{krauseBalance} $KRAUSE, {ticketBalance} Tickets</h1>}

        {selectedProposal && <button onClick={() => setSelectedProposal()}>View Proposals</button>}
        {selectedProposal 
          ? fullProposal(proposalById(proposals, selectedProposal)) 
          : proposalsList()}
        
      </main>

      <footer className={styles.footer}>
        <a
          href="krausehouse.club"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/kh_holo.png" alt="KH Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
