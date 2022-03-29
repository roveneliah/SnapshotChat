import { useEffect } from "react";
import { useAlchemyProvider } from "./useAlchemyProvider";
import { connectWallet } from "../../utils/web3/connectWallet";
import { updateProvider } from "../../utils/web3/updateProvider";

/**
 * Hook to connect to a provider and listen for changes.
 *
 * Uses Alchemy if no web3 provider is available.
 */
export const useListenProvider = () => {
  const [provider, setProvider] = useAlchemyProvider();

  // Trigger WalletConnect modal.
  useEffect(() => {
    connectWallet(setProvider)();
  }, [setProvider]);

  // Listen for provider updates.
  useEffect(() => {
    window.ethereum.on("accountsChanged", updateProvider(setProvider));
    window.ethereum.on("networkChanged", updateProvider(setProvider));
  }, []);

  return [provider, setProvider];
};
