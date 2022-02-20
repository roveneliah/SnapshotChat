import { useEffect } from "react";
import { ethers } from "ethers";
import { useAlchemyProvider } from "./useEtherscanProviderAsDefault";
import { connectWallet } from "../utils/connectWallet";

// we want to check for web3modal connection, and override alchemy provider if it exists
export const useListenProvider = () => {
  const [provider, setProvider] = useAlchemyProvider();

  useEffect(() => {
    console.log("useListenProvider: checking for web3modal connection");
    connectWallet(setProvider)();
  }, [setProvider]);

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
