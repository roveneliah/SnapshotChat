import Head from "next/head";
import { Header } from "./Header";

export default function Layout({ connect, wallet, children }) {
  return (
    <div className="dark:bg-gray-800 h-max">
      <Head>
        <title>Krause House</title>
        <meta name="description" content="web3's Home Team" />
        <link rel="icon" href="/kh_holo.png" />
      </Head>
      <main>
        <Header connect={connect} wallet={wallet} />
        {children}
      </main>
    </div>
  );
}
