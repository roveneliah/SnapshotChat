import { Heading } from "../components/Generics/Headings/Heading";
import { Button } from "../components/Buttons/Button";
import { useForm } from "../hooks/useForm";
import { filter, identity, map, prop, props } from "ramda";
import { useEffect, useState } from "react";
import { printPass } from "../utils/functional";
import { getProfile, loadProfileAtAddress } from "../utils/firestore";
import { shortenAddress } from "../utils/shortenAddress";
import Image from "next/image";
import { Menu } from "@headlessui/react";

import { Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";

import algoliasearch from "algoliasearch/lite";
import { buildAvatarUrl } from "../utils/buildAvatarUrl";
import { avatarUrl } from "../utils/avatarUrl";

export default function FollowingDropdown({ followingProfile, userProfile }) {
  return (
    <div className="w-56">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Options
            <ChevronDownIcon
              className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {userProfile.primaryDelegate !== followingProfile.address && (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      onClick={() =>
                        userProfile.setPrimaryDelegate(followingProfile.address)
                      }
                    >
                      {active ? (
                        <DuplicateActiveIcon
                          className="w-5 h-5 mr-2"
                          aria-hidden="true"
                        />
                      ) : (
                        <DuplicateInactiveIcon
                          className="w-5 h-5 mr-2"
                          aria-hidden="true"
                        />
                      )}
                      Make Primary Delegate
                    </button>
                  )}
                </Menu.Item>
              )}

              {userProfile.primaryDelegate === followingProfile.address && (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      onClick={() => userProfile.clearPrimaryDelegate()}
                    >
                      {active ? (
                        <DuplicateActiveIcon
                          className="w-5 h-5 mr-2"
                          aria-hidden="true"
                        />
                      ) : (
                        <DuplicateInactiveIcon
                          className="w-5 h-5 mr-2"
                          aria-hidden="true"
                        />
                      )}
                      Remove Primary Delegate
                    </button>
                  )}
                </Menu.Item>
              )}
            </div>
            <div className="px-1 py-1">
              {/* <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <ArchiveActiveIcon
                        className="w-5 h-5 mr-2"
                        aria-hidden="true"
                      />
                    ) : (
                      <ArchiveInactiveIcon
                        className="w-5 h-5 mr-2"
                        aria-hidden="true"
                      />
                    )}
                    Archive
                  </button>
                )}
              </Menu.Item> */}
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <MoveActiveIcon
                        className="w-5 h-5 mr-2"
                        aria-hidden="true"
                      />
                    ) : (
                      <MoveInactiveIcon
                        className="w-5 h-5 mr-2"
                        aria-hidden="true"
                      />
                    )}
                    View Profile
                  </button>
                )}
              </Menu.Item>
              {followingProfile?.discord?.id && (
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      // href={`https://discordapp.com/channels/@me/${followingProfile.discord.id}`}
                    >
                      {active ? (
                        <EditActiveIcon
                          className="w-5 h-5 mr-2"
                          aria-hidden="true"
                        />
                      ) : (
                        <EditInactiveIcon
                          className="w-5 h-5 mr-2"
                          aria-hidden="true"
                        />
                      )}
                      Message on Discord
                    </a>
                  )}
                </Menu.Item>
              )}
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    onClick={() =>
                      userProfile.unfollow(followingProfile.address)
                    }
                  >
                    {active ? (
                      <DeleteActiveIcon
                        className="w-5 h-5 mr-2 text-red-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <DeleteInactiveIcon
                        className="w-5 h-5 mr-2 text-red-400"
                        aria-hidden="true"
                      />
                    )}
                    Unfollow
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

function EditInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
    </svg>
  );
}

function EditActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
    </svg>
  );
}

function DuplicateInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4H12V12H4V4Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <path
        d="M8 8H16V16H8V8Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
    </svg>
  );
}

function DuplicateActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4H12V12H4V4Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <path
        d="M8 8H16V16H8V8Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
    </svg>
  );
}

function ArchiveInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="8"
        width="10"
        height="8"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <rect
        x="4"
        y="4"
        width="12"
        height="4"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function ArchiveActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="8"
        width="10"
        height="8"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <rect
        x="4"
        y="4"
        width="12"
        height="4"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function MoveInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 4H16V10" stroke="#A78BFA" strokeWidth="2" />
      <path d="M16 4L8 12" stroke="#A78BFA" strokeWidth="2" />
      <path d="M8 6H4V16H14V12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function MoveActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 4H16V10" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M16 4L8 12" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M8 6H4V16H14V12" stroke="#C4B5FD" strokeWidth="2" />
    </svg>
  );
}

function DeleteInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#A78BFA" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function DeleteActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#C4B5FD" strokeWidth="2" />
    </svg>
  );
}

const useGetFollowingProfiles = (addresses) => {
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

function UserProfileCard(props) {
  return (
    <div className="flex flex-col space-y-5 pt-10 w-1/4 max-w-xs bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center">
        <Image
          src={avatarUrl(props.userProfile)}
          alt="Profile Pic"
          width={150}
          height={150}
          className="mb-5 rounded-full shadow-lg"
        />
      </div>
      <div className="flex flex-col items-center">
        {props.userProfile?.discordUsername ? (
          <h3 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {props.userProfile?.discordUsername}
          </h3>
        ) : (
          <span className="bg-gray-100 text-gray-800 text-lg font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-200 dark:text-gray-900">
            {shortenAddress(props.userProfile?.address)}
          </span>
        )}
      </div>
      <div>
        <div className="flex flex-col items-center space-y-3">
          {props.userProfile?.discordUsername && (
            <div>
              <span className="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-200 dark:text-gray-900">
                {shortenAddress(props.wallet.address)}
              </span>
            </div>
          )}
          <div>
            <span className="bg-purple-100 text-purple-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-purple-200 dark:text-purple-900">
              {props.wallet?.$KRAUSE || 0} $KRAUSE
            </span>
          </div>
          <div>
            <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">
              {props.wallet?.TICKETS || 0} Genesis Tickets
            </span>
          </div>
        </div>
        {/* <div className="flex justify-center mt-4 space-x-3 lg:mt-6">
          <a
            href="#"
            className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add friend
          </a>
          <a
            href="#"
            className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-800"
          >
            Message
          </a>
        </div> */}
      </div>
    </div>
  );
}

function FollowingProfileCard(props) {
  return (
    <div className="flex flex-col space-y-3 p-6 max-w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div>
        {props.followingProfile.address ===
          props.userProfile.primaryDelegate && (
          <span className="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
            Primary Delegate
          </span>
        )}
      </div>
      <div>
        <Image
          src={avatarUrl(props.followingProfile)}
          width={50}
          height={50}
          className="rounded-full"
        />
      </div>
      <Heading title={props.followingProfile?.discordUsername} size="xl" />

      <div>
        <span className="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-200 dark:text-gray-900">
          {shortenAddress(props.followingProfile?.address)}
        </span>
      </div>
      <FollowingDropdown
        unfollow={() =>
          props.userProfile?.unfollow(props.followingProfile.address)
        }
        userProfile={props.userProfile}
        followingProfile={props.followingProfile}
        setPrimaryDelegate={() =>
          props.userProfile?.setPrimaryDelegate(props.followingProfile.address)
        }
        clearPrimaryDelegate={() => props.userProfile?.clearPrimaryDelegate()}
      />
    </div>
  );
}

const useGetSearchResults = (query) => {
  // config search client
  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY
  );
  const index = searchClient.initIndex("krausehouse-profiles");

  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    const search = async (query) => {
      const result = await index.search(query);
      const hits = result.hits;
      return hits;
    };

    search(query).then(setSearchResults);
  }, [query]);

  return searchResults;
};

function JerrySearch(props) {
  const [addressInput, updateAddressInput] = useForm("");
  const searchResults = useGetSearchResults(addressInput);

  return (
    <div className="flex flex-col space-y-4 p-6 bg-white rounded-lg border border-gray-200 shadow-xl dark:bg-gray-800 dark:border-gray-700">
      <Heading title="Search" size="xl" />
      <input
        value={addressInput}
        onChange={updateAddressInput}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search the Jerryverse..."
      />
      <div className="grid grid-cols-2">
        {searchResults
          .filter(
            ({ address }) => !props.userProfile.following?.includes(address)
          )
          .filter(({ address }) => address !== props.userProfile.address)
          .map((profile, i) => (
            <div
              key={i}
              className="flex flex-col space-y-3 p-6 m-2 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-500"
            >
              <div>
                <Image
                  src={avatarUrl(profile)}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </div>
              <div>
                <Heading title={profile.discordUsername} size="md" />
                {profile.address && (
                  <span className="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-200 dark:text-gray-900">
                    {shortenAddress(profile.address)}
                  </span>
                )}
              </div>
              <Button
                title="Follow"
                color="purple"
                onClick={() => props.userProfile.follow(profile.address)}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export function ProfilePage(props) {
  const following = useGetFollowingProfiles(props.userProfile?.following);

  return props.userProfile ? (
    <div className="flex flex-row justify-center space-x-3">
      <UserProfileCard userProfile={props.userProfile} wallet={props.wallet} />
      <div className="flex flex-col space-y-5 w-1/2">
        <div className="flex flex-col space-y-4 p-6 bg-white rounded-lg border border-gray-200 shadow-xl dark:bg-gray-800 dark:border-gray-700">
          {props.userProfile && (
            <div>
              <Heading title="Following" size="xl" />
              <div className="flex flex-col space-y-3">
                {following?.map((followingProfile, i) => (
                  <FollowingProfileCard
                    key={i}
                    userProfile={props.userProfile}
                    followingProfile={followingProfile}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <JerrySearch userProfile={props.userProfile} />
      </div>
    </div>
  ) : (
    <div className="flex flex-row justify-center space-x-3">
      <div className="flex flex-col w-2/3 space-y-4 p-6 bg-white rounded-lg border border-gray-200 shadow-xl dark:bg-gray-800 dark:border-gray-700">
        <Heading title="Connect your wallet to view your profile." size="xl" />
        <Image
          src="https://i.giphy.com/media/1AjFHLpytkqt0qYDcW/giphy.webp"
          alt="DO IT"
          height={400}
          width={-1} // wtf
        />
      </div>
    </div>
  );
}
