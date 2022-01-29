import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useListenWallet } from "./useListenWallet";
import {
  useAlchemyProvider,
  useEtherscanProviderAsDefault,
} from "./useEtherscanProviderAsDefault";
import { useListenSigner } from "./useListenSigner";
import { composeP } from "ramda";

const useListenProvider = () => {
  const [provider, setProvider] = useAlchemyProvider();
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", async (accounts) => {
        if (accounts.length > 0) {
          setProvider(
            new ethers.providers.Web3Provider(window.ethereum, "any")
          );
          return;
        }
        setProvider(null);
      });
    }
  }, []);

  return [provider, setProvider];
};

export function useGetWeb3() {
  const [provider, setProvider] = useListenProvider();
  const [signer, setSigner] = useListenSigner(provider);
  const [wallet, hodler] = useListenWallet(provider, signer);

  // console.log("provider", provider);
  // console.log("signer", signer);
  // console.log("wallet", wallet);
  return {
    provider,
    setProvider,
    signer,
    setSigner,
    wallet,
    hodler,
  };
}
