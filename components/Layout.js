
import Head from "next/head"
import { Header } from "./Header"

export default function Layout({ connected, connectWallet, setSigner, setConnected, setProvider, wallet, children }) {
  return (
    <div className="dark:bg-gray-800 h-max">
      <Head>
        <title>Krause House</title>
        <meta name="description" content="web3's Home Team" />
        <link rel="icon" href="/kh_holo.png" />
      </Head>
      <main>
        <Header
          connected={connected}
          connect={connectWallet({setSigner, setProvider, setConnected})}
          setSigner={setSigner}
          wallet={wallet}/>
        {children}
      </main>
    </div>
  )
}