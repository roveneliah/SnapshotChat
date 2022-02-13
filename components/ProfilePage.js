import { Heading } from "../components/Generics/Headings/Heading";
import { Button } from "../components/Buttons/Button";
import { useForm } from "../hooks/useForm";
import { filter, identity, map, prop, props } from "ramda";
import { useEffect, useState } from "react";
import { printPass } from "../utils/functional";
import { getProfile } from "../utils/firestore";
import { Table } from "./Table";

const useGetFollowingUsernames = (addresses) => {
  const [following, setFollowing] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsernamesFromAddresses = async (addresses) => {
      console.log("loading usernames", addresses);
      return Promise.all(addresses.map(getProfile));
    };

    addresses &&
      getUsernamesFromAddresses(addresses)
        .then(filter((profile) => profile))
        .then(printPass)
        .then(setFollowing);
  }, [addresses]);

  return following;
};

// TODO: NEED TO GET THE USERNAMES FROM ADDRESSES OF FOLLOWING, should probably just be loaded in the profile...
export function ProfilePage(props) {
  // const { following, follow, unfollow } = props.userProfile?.following;
  const [addressInput, updateAddressInput] = useForm("");
  const following = useGetFollowingUsernames(props.userProfile?.following);

  console.log(following);

  return (
    <div className="flex flex-row justify-center space-x-3">
      <div className="flex flex-col w-2/3 space-y-4 p-6 bg-white rounded-lg border border-gray-200 shadow-xl dark:bg-gray-800 dark:border-gray-700">
        <Heading title="Profile" size="2xl" />
        <p>
          Here you can follow/unfollow Jerry's to get the spiciest takes on
          proposals.
        </p>
        <p>Soon you'll be able to automate your voting by delegating.</p>
        <Heading title="Connect wallet to view your profile." size="md" />
        {props.userProfile && (
          <div>
            <Heading title={props.userProfile?.discordUsername} size="lg" />
            <Heading title={props.userProfile?.address} size="lg" />
          </div>
        )}

        {props.userProfile && (
          <div>
            <Heading title="Following" size="xl" />
            {/* {props.userProfile?.following.map((address, i) => (
              <div key={i}>
                <Button
                  title="Unfollow"
                  onClick={() => props.userProfile?.unfollow(address)}
                />
                {address}
              </div>
            ))} */}

            {/* getting address from the upper case one, but pushing to lower case one, SHIT */}
            <div className="flex flex-col space-y-3">
              {following?.map((profile, i) => (
                <div
                  key={i}
                  className="p-6 max-w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
                >
                  <Heading title={profile?.discordUsername} size="xl" />
                  <p>{profile?.address}</p>
                  <br />
                  <Button
                    title="Unfollow"
                    onClick={() => props.userProfile?.unfollow(profile.address)}
                  />
                </div>
              ))}
            </div>
            <div>
              <Heading title="Search" size="xl" />
              <input
                value={addressInput}
                onChange={updateAddressInput}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search by username [coming soon]"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
