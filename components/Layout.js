import Head from "next/head";
import { Header } from "./Header";

export default function Layout({ connect, wallet, children }) {
  return (
    <div className="flex justify-center dark:bg-gray-800 min-h-max min-h-screen">
      <Head>
        <title>Krause House</title>
        <meta name="description" content="web3's Home Team" />
        <link rel="icon" href="/kh_holo.png" />
      </Head>
      <main className="w-full">
        <Header connect={connect} wallet={wallet} />
        {children}
      </main>
    </div>
  );
}
