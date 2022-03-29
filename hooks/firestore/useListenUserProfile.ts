import { reduce } from "ramda";
import { useEffect, useState } from "react";
import { loadProfileAtAddress } from "../../utils/firestore";
import { address } from "../../types/Address";
import { useGetProfiles } from "./useGetProfiles";

export const useListenUserProfile = (wallet: any) => {
  const [userProfile, setUserProfile] = useState<any>();
  const following: address[] = useGetProfiles(userProfile?.following);
  const followingNo: address[] = useGetProfiles(userProfile?.followingNo);

  /**
   * Turn array of addresses into address -> profile map
   */
  const toObject: (addresses: address[]) => { [address: address]: any } =
    reduce((acc, f: any) => ({ ...acc, [f.address]: f }), {});

  useEffect(() => {
    if (wallet?.address) {
      !userProfile
        ? loadProfileAtAddress(wallet?.address, setUserProfile) // TODO: MIGHT need to be a async...
        : setUserProfile({
            ...userProfile,
            followingProfiles: toObject(following),
            followingNoProfiles: toObject(followingNo),
          });
    } else {
      setUserProfile(null);
    }
  }, [following]);

  useEffect(() => {
    console.log("trying to update userProfile!");
    wallet?.address
      ? loadProfileAtAddress(wallet?.address, setUserProfile) // TODO: MIGHT need to be a async...
      : setUserProfile(null);
  }, [wallet]);
  return userProfile;
};
