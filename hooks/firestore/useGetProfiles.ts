import { filter } from "ramda";
import { useEffect, useState } from "react";
import { getProfile } from "../../utils/firestore";
import { printPass } from "../../utils/functional";
import { address } from "../web3/useGetWeb3";

// export interface UserProfileInfo {
//   name: string;
//   about: string;
//   address: address;
//   discordUsername: string;
//   filters: string[];
//   profileImage: string;
//   projects: string[];
//   roles: string[];
//   twitterUrl: string;
//   following: address[];
//   followingNo: address[];
// }

/**
 * Get the user's profile from firestore.
 * This gets a "view" version that does not have functions to edit the profile.
 * TODO: Add a UserProfileInfo type.
 */
export const useGetProfiles = (addresses: address[]) => {
  const [profiles, setProfiles] = useState<any>();

  useEffect(() => {
    const getAllProfiles = async (addresses: address[]) => {
      return Promise.all(addresses.map(getProfile));
    };

    addresses &&
      getAllProfiles(addresses)
        .then(filter((profile) => profile != undefined)) // filter out undefined (TEST)
        .then(setProfiles);
  }, [addresses]);

  return profiles;
};
