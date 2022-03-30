import { reduce } from "ramda";
import { useEffect, useState } from "react";
import { loadProfileAtAddress } from "../../utils/firestore";
import { address } from "../../types/Address";
import { useGetProfiles } from "./useGetProfiles";

/**
 * Turn array of addresses into address -> profile map
 */
const toObject: (addresses: address[]) => { [address: address]: any } = reduce(
  (acc, f: any) => ({ ...acc, [f.address]: f }),
  {}
);

export const useListenUserProfile = (wallet: any) => {
  const [userProfile, setUserProfile] = useState<any>();
  const following: address[] = useGetProfiles(userProfile?.following);
  const followingNo: address[] = useGetProfiles(userProfile?.followingNo);

  // Load profile on wallet events.
  useEffect(() => {
    loadProfileAtAddress(wallet?.address, setUserProfile);
  }, [wallet]);

  // Load profiles on updates to followers.
  useEffect(() => {
    if (wallet?.address && userProfile) {
      setUserProfile({
        ...userProfile,
        followingProfiles: toObject(following),
        followingNoProfiles: toObject(followingNo),
      });
    } else {
      setUserProfile(null);
    }
  }, [following, followingNo]);

  return userProfile;
};
