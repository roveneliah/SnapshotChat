import { useEffect } from "react";
import { ethers } from "ethers";
import { useAlchemyProvider } from "./useEtherscanProviderAsDefault";
import { connectWallet } from "../../utils/web3/connectWallet";

export const useListenProvider = () => {
  const [provider, setProvider] = useAlchemyProvider();

  // Try to connect with wallet connect on opening the app, probably DONT want this
  useEffect(() => {
    console.log("useListenProvider: checking for web3modal connection");
    connectWallet(setProvider)();
  }, [setProvider]);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", async (accounts) => {
        if (accounts.length > 0) {
          const newProvider = new ethers.providers.Web3Provider(
            window.ethereum,
            "any"
          );

          setProvider(newProvider);
          return;
        }
        setProvider(null);
      });
      window.ethereum.on("networkChanged", async (accounts) => {
        if (accounts.length > 0) {
          const newProvider = new ethers.providers.Web3Provider(
            window.ethereum,
            "any"
          );

          setProvider(newProvider);
          return;
        }
        setProvider(null);
      });
    }
  }, []);

  return [provider, setProvider];
};
