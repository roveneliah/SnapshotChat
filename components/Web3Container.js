import { cloneElement, useEffect, useState } from "react";
import { map } from "ramda";
import Layout from "./Layout";
import { connectWallet, disconnectWallet } from "../utils/connectWallet";
import { useGetWeb3 } from "../hooks/useGetWeb3";
import { printPass } from "../utils/functional";

export const isMainnet = async (provider) =>
  provider?.getNetwork().then(({ chainId }) => chainId !== 1);

export const useIsWrongNetwork = (provider) => {
  const [wrongNetwork, setWrongNetwork] = useState(false);
  useEffect(async () => {
    isMainnet(provider).then(setWrongNetwork);
  }, [provider]);
  return wrongNetwork;
};

export default function Web3Container({ render }) {
  const { provider, setProvider, signer, wallet, hodler, userProfile } =
    useGetWeb3();
  const wrongNetwork = useIsWrongNetwork(provider);

  return (
    <Layout
      connect={connectWallet(setProvider)}
      disconnect={disconnectWallet(provider, setProvider)}
      wallet={wallet}
      wrongNetwork={wrongNetwork}
    >
      {render({
        provider,
        signer,
        wallet,
        hodler,
        userProfile,
        wrongNetwork,
      })}
    </Layout>
  );
}
