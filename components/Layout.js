import Head from "next/head";
import { Header } from "./Header";

export default function Layout({ connect, disconnect, wallet, children }) {
  return (
    <div className="dark:bg-gray-800 min-h-max min-h-screen">
      <Head>
        <title>Krause House</title>
        <meta name="description" content="web3's Home Team" />
        <link rel="icon" href="/kh_holo.png" />
      </Head>
      <main className="w-full">
        <Header connect={connect} disconnect={disconnect} wallet={wallet} />
        {children}
      </main>
    </div>
  );
}
