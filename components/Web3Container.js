import { cloneElement } from "react";
import { map } from "ramda";
import Layout from "./Layout";
import { connectWallet } from "../utils/connectWallet";
import { useGetWeb3 } from "../hooks/useGetWeb3";

export default function Web3Container({ render }) {
  const { provider, setProvider, signer, wallet, hodler } = useGetWeb3();
  return (
    <Layout connect={connectWallet(setProvider)} wallet={wallet}>
      {render({
        provider,
        signer,
        wallet,
        hodler,
      })}
    </Layout>
  );
}
