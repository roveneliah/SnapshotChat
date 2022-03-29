import { useState, useEffect } from "react";
import { getKHWallet } from "../../utils/web3/getKHWallet";
import { Wallet } from "../../types/Wallet";

export const useListenWallet = (provider: any, signer: any): Wallet => {
  const MISSING_WALLET = { loaded: false };
  const [wallet, setWallet] = useState<Wallet>(MISSING_WALLET);

  useEffect(() => {
    const walletStuff = async () => {
      if (signer) {
        console.log("signer", signer);
        const address = await signer.getAddress();
        const wallet = address && (await getKHWallet(provider)(address));

        console.log("UPDATING WALLET");
        setWallet(wallet);
      } else {
        console.log("NO ACTIVE WALLET");
        setWallet(MISSING_WALLET);
      }
    };

    walletStuff();
  }, [signer]);

  return wallet;
};

// DEPRECATED
