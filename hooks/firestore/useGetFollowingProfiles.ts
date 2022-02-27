import { filter } from "ramda";
import { useEffect, useState } from "react";
import { getProfile } from "../../utils/firestore";
import { printPass } from "../../utils/functional";
import { address } from "../web3/useGetWeb3";

export const useGetFollowingProfiles = (addresses: address[]) => {
  const [following, setFollowing] = useState<any[]>([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsernamesFromAddresses = async (addresses: address[]) => {
      console.log("loading usernames", addresses);
      return Promise.all(addresses.map(getProfile));
    };

    addresses &&
      getUsernamesFromAddresses(addresses)
        .then(filter((profile) => profile != undefined)) // filter out undefined (TEST)
        .then(setFollowing);
  }, [addresses]);

  return following;
};
