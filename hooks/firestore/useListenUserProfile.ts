import { useEffect, useState } from "react";
import { loadProfileAtAddress } from "../../utils/firestore";

export const useListenUserProfile = (wallet: any) => {
  const [userProfile, setUserProfile] = useState<any>();
  useEffect(() => {
    if (wallet?.address) {
      console.log("ATTEMPING TO UPDATE USERPROFILE");
      loadProfileAtAddress(wallet?.address, setUserProfile); // TODO: MIGHT need to be a async...
    } else {
      setUserProfile(null);
    }
  }, [wallet]);
  return userProfile;
};
