import { useEffect } from "react";
import { ethers } from "ethers";
import { useAlchemyProvider } from "./useEtherscanProviderAsDefault";

export const useListenProvider = () => {
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
