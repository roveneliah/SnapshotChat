import { Wallet } from "./Wallet";

export interface Connection {
  provider: any;
  wrongNetwork: boolean;
  signer?: any;
  wallet?: Wallet;
  hodler: boolean;
  userProfile?: any; // TODO: UserProfile type
  setProvider?: Function;
  setSigner?: Function;
  snapshotVote?: Function;
}
