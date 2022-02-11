import { useState, useEffect } from "react";
import { useListenWallet } from "./useListenWallet";
import { useListenSigner } from "./useListenSigner";
import { useListenProvider } from "./useListenProvider";
import { loadProfileAtAddress } from "../utils/firestore";
import { migrateRoster } from "../utils/migrateRoster";

// Need a DB where we can add wallet with preferences
const useListenUserProfile = (wallet) => {
  const [userProfile, setUserProfile] = useState();
  useEffect(async () => {
    // call firebase to handle this new profile
    loadProfileAtAddress(wallet?.address, setUserProfile);
    // migrateRoster();
  }, [wallet]);
  return userProfile;
};

export function useGetWeb3() {
  const [provider, setProvider] = useListenProvider();
  const [signer, setSigner] = useListenSigner(provider);
  const [wallet, hodler] = useListenWallet(provider, signer);
  const userProfile = useListenUserProfile(wallet);

  return {
    provider,
    setProvider,
    signer,
    setSigner,
    wallet,
    hodler,
    userProfile,
  };
}
