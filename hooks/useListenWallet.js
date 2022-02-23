import { useState, useEffect } from "react";
import { getKHWallet } from "../utils/getKHWallet";

export const useListenWallet = (provider, signer) => {
  const [wallet, setWallet] = useState();
  const [hodler, setHodler] = useState(false); // TODO: does this really need to be state?

  useEffect(() => {
    const walletStuff = async () => {
      if (signer) {
        const address = await signer.getAddress();
        const wallet = address && (await getKHWallet(provider)(address));

        console.log("UPDATING WALLET");
        setWallet(wallet);
        setHodler(wallet?.TICKETS > 0 || wallet?.$KRAUSE > 0);
      } else {
        console.log("NO ACTIVE WALLET");
        setWallet(null);
        setHodler(null);
      }
    };
    walletStuff();
  }, [signer]);

  return [wallet, hodler];
};
