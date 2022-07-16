import Head from "next/head";
import { FooterImages } from "./FooterImages";
import { Header } from "./Header";

export default function Layout({
  connect,
  disconnect,
  wallet,
  children,
  wrongNetwork,
}: any) {
  return (
    <div>
      <Head>
        <title>Krause House</title>
        <meta name="description" content="web3's Home Team" />
        <link rel="icon" href="/kh_holo.png" />
      </Head>
      <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center opacity-30 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="[mask-image-opacity-50] h-[100vh] bg-gradient-to-tr from-purple-900 to-purple-500">
        <Header
          connect={connect}
          disconnect={disconnect}
          wallet={wallet}
          wrongNetwork={wrongNetwork}
        />
        <div className="absolute top-24 h-[90vh] w-screen overflow-y-hidden">
          {children}
        </div>
        {/* <FooterImages /> */}
      </div>
    </div>
  );
}
