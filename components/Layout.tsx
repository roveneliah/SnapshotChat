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
    <div className="h-[100vh] overflow-hidden bg-black">
      <Head>
        <title>Krause House</title>
        <meta name="description" content="web3's Home Team" />
        <link rel="icon" href="/kh_holo.png" />
      </Head>
      <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center opacity-30 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      {/* <div className="absolute inset-0 bg-[url(/crackle.svg)] bg-cover opacity-30 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div> */}

      <div className="[mask-image-opacity-50] h-[100vh] overflow-auto bg-gradient-to-tr from-purple-900 to-purple-500">
        <Header
          connect={connect}
          disconnect={disconnect}
          wallet={wallet}
          wrongNetwork={wrongNetwork}
        />
        <div className="absolute top-24 h-screen w-screen overflow-auto">
          {children}
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
          <Image
            src="/greg.png"
            height={90}
            width={90}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
