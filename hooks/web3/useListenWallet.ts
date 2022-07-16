import { useState, useEffect } from "react";
import { getKHWallet } from "../../utils/web3/getKHWallet";
import { Wallet } from "../../types/Wallet";
import { composeP } from "../../utils/functional";

export const useListenWallet = (provider: any, signer: any): Wallet => {
  const MISSING_WALLET: Wallet = { loaded: false };
  const [wallet, setWallet] = useState<any>(MISSING_WALLET);

  useEffect(() => {
    const updateWallet = async () => {
      if (signer) {
        const address = await signer.getAddress();
        getKHWallet(provider)(address)
          .then(setWallet)
          .catch(() => setWallet(MISSING_WALLET));
      } else {
        setWallet(MISSING_WALLET);
      }
    };

    updateWallet();
  }, [signer]);

  return wallet;
};
