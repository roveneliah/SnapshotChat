import Head from "next/head";
import Image from "next/image";
import { Header } from "./Header";

export default function Layout({
  connect,
  disconnect,
  wallet,
  children,
  wrongNetwork,
}: any) {
  return (
    <div className="theme-basic-light bg-gradient-to-tr from-purple-900 to-purple-500 dark:bg-gray-800 h-screen overflow-auto">
      <div className="absolute -bottom-9 left-48">
        <Image
          src="/coachrick.png"
          height={150}
          width={180}
          className="rounded-lg"
        />
      </div>
      <div className="absolute bottom-8 right-14">
        <Image
          src="/mario.png"
          height={100}
          width={100}
          className="rounded-lg"
        />
      </div>
      <div className="absolute -bottom-4 right-16">
        <Image
          src="/flex.png"
          height={100}
          width={100}
          className="rounded-lg"
        />
      </div>
      <div className="absolute -bottom-4 right-0">
        <Image
          src="/commodore.png"
          height={100}
          width={100}
          className="rounded-lg"
        />
      </div>
      <div className="absolute -bottom-5 left-1">
        <Image
          src="/boosh.png"
          height={100}
          width={100}
          className="rounded-lg"
        />
      </div>
      <div className="absolute -bottom-3 left-14">
        <Image
          src="/barbosa.png"
          height={80}
          width={100}
          className="rounded-lg"
        />
      </div>
      <div className="absolute -bottom-3 left-24">
        <Image
          src="/icecube.png"
          height={100}
          width={150}
          className="rounded-lg"
        />
      </div>
      <div className="absolute -bottom-6 left-44">
        <Image src="/greg.png" height={90} width={90} className="rounded-lg" />
      </div>
      <Head>
        <title>Krause House</title>
        <meta name="description" content="web3's Home Team" />
        <link rel="icon" href="/kh_holo.png" />
      </Head>
      <main className="w-full">
        <Header
          connect={connect}
          disconnect={disconnect}
          wallet={wallet}
          wrongNetwork={wrongNetwork}
        />
        <div className="absolute top-24 overflow-auto h-screen w-screen">
          {children}
        </div>
      </main>
    </div>
  );
}
