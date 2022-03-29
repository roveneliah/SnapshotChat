import { useState, useEffect } from "react";
import { useListenWallet } from "./useListenWallet";
import { useListenSigner } from "./useListenSigner";
import { useListenProvider } from "./useListenProvider";
import { useIsWrongNetwork } from "./useIsWrongNetwork";
import { useListenUserProfile } from "../firestore/useListenUserProfile";
import { vote } from "../../utils/Snapshot/vote";

export function useGetWeb3() {
  const [provider, setProvider] = useListenProvider();
  const [signer, setSigner] = useListenSigner(provider);
  const wallet = useListenWallet(provider, signer);
  const userProfile = useListenUserProfile(wallet);
  const wrongNetwork = useIsWrongNetwork(provider); // TODO: should just set name OF network...and we can handle "right networks" elsewhere
  const snapshotVote = vote(provider);

  return {
    provider,
    setProvider,
    wrongNetwork,
    signer,
    setSigner,
    snapshotVote,
    wallet,
    hodler: wallet?.hodler,
    userProfile,
  };
}
