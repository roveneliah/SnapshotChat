import { useState, useEffect } from "react";
import { useListenWallet, Wallet } from "./useListenWallet";
import { useListenSigner } from "./useListenSigner";
import { useListenProvider } from "./useListenProvider";
import { loadProfileAtAddress } from "../../utils/firestore";
import { useIsWrongNetwork } from "./useIsWrongNetwork";
import { useListenUserProfile } from "../firestore/useListenUserProfile";
import { vote } from "../../utils/Snapshot/vote";
import { useGetProfiles } from "../firestore/useGetProfiles";
import { pick } from "ramda";
import { Maybe } from "./useListenWallet";

export interface ForumProfile {
  filters: string[]; // TODO: should be an enum
  primaryDelegate: address;
  secondaryDelegate: address;
  following: address[];
  followingNo: address[];
  follow: (address: address) => void; // TODO: is void return correct? // we should make sure the user is signed in in order to follow
  unfollow: (address: address) => void;
  followNo: (address: address) => void;
  unfollowNo: (address: address) => void;
  clearPrimaryDelegate: () => void;
  clearSecondaryDelegate: () => void;
}

export type address = string;
export interface User {
  address: address;
  wallet: Wallet;
  profile?: {
    name: string;
    about: string;
    discordUsername: string;
    profileImage: string;
    projects: string[];
    roles: string[];
    twitterUrl: string;
  };
  forum: ForumProfile;
  discord: DiscordProfile;
}

export interface DiscordProfile {
  id: string;
  avatar: string;
  profileUrl: string;
}

export function useGetWeb3() {
  const [provider, setProvider] = useListenProvider();
  const [signer, setSigner] = useListenSigner(provider);
  const wallet = useListenWallet(provider, signer);
  const userProfile = useListenUserProfile(wallet);
  const wrongNetwork = useIsWrongNetwork(provider); // TODO: should just set name OF network...and we can handle "right networks" elsewhere

  return {
    provider,
    setProvider,
    signer,
    setSigner,
    wrongNetwork,

    wallet,
    hodler: wallet?.hodler,
    userProfile,
  };
}
