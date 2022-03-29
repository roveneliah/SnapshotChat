import { useListenWallet } from "./useListenWallet";
import { useListenSigner } from "./useListenSigner";
import { useListenProvider } from "./useListenProvider";
import { useIsWrongNetwork } from "./useIsWrongNetwork";
import { useListenUserProfile } from "../firestore/useListenUserProfile";
import { vote } from "../../utils/Snapshot/vote";
import { User } from "../../types/User";
import { Wallet } from "../../types/Wallet";
import { Connection } from "../../types/Connection";

export function useGetWeb3(): Connection {
  const [provider, setProvider] = useListenProvider();
  const [signer, setSigner] = useListenSigner(provider);
  const wallet: Wallet = useListenWallet(provider, signer);
  const userProfile: User = useListenUserProfile(wallet); // TODO: is User right?  Maybe call this profile?
  const wrongNetwork: boolean = useIsWrongNetwork(provider); // TODO: should just set name OF network...and we can handle "right networks" elsewhere
  const snapshotVote: Function = vote(provider);

  return {
    provider,
    setProvider,
    wrongNetwork,
    signer,
    setSigner,
    snapshotVote,
    wallet,
    hodler: wallet?.hodler ? true : false, // TODO: create wallet obj type? can handle empty?
    userProfile,
  };
}
