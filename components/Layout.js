
import Head from "next/head"

export default function Layout({ children }) {
  return (
    <div className="dark:bg-gray-800 h-max">
      <Head>
        <title>Krause House</title>
        <meta name="description" content="web3's Home Team" />
        <link rel="icon" href="/kh_holo.png" />
      </Head>
      <main>
        {children}
      </main>
    </div>
  )
}