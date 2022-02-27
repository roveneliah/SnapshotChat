import { useEffect, useState } from "react";
import { loadProfileAtAddress } from "../../utils/firestore";

export const useLoadProfile = (address: string) => {
  const [profile, setProfile] = useState<any>(null);
  useEffect(() => {
    loadProfileAtAddress(address, setProfile);
  }, [address]);
  return profile;
};
