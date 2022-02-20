import { cloneElement } from "react";
import { map } from "ramda";
import Layout from "./Layout";
import { connectWallet, disconnectWallet } from "../utils/connectWallet";
import { useGetWeb3 } from "../hooks/useGetWeb3";

export default function Web3Container({ render }) {
  const { provider, setProvider, signer, wallet, hodler, userProfile } =
    useGetWeb3();

  return (
    <Layout
      connect={connectWallet(setProvider)}
      disconnect={disconnectWallet(provider, setProvider)}
      wallet={wallet}
    >
      {render({
        provider,
        signer,
        wallet,
        hodler,
        userProfile,
      })}
    </Layout>
  );
}
