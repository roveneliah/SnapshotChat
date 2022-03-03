import { cloneElement, useEffect, useState } from "react";
import { map } from "ramda";
import Layout from "./Layout";
import { connectWallet, disconnectWallet } from "../utils/web3/connectWallet";
import { useGetWeb3 } from "../hooks/web3/useGetWeb3";
import { printPass } from "../utils/functional";

export default function Web3Container({ render }) {
  const connection = useGetWeb3();
  const { provider, setProvider, wallet, wrongNetwork } = connection;

  return (
    <Layout
      connect={connectWallet(setProvider)}
      disconnect={disconnectWallet(provider, setProvider)}
      wallet={wallet}
      wrongNetwork={wrongNetwork}
    >
      {render(connection)}
    </Layout>
  );
}
