import Image from "next/image";
import { avatarUrl } from "../../utils/avatarUrl";
import { shortenAddress } from "../../utils/web3/shortenAddress";
import FollowingDropdown from "./FollowingDropdown";

export default function FollowingProfileCard(props) {
  return (
    <div className="flex flex-col justify-between h-full space-y-3 p-6 max-w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-row space-x-2">
        <div>
          <Image
            src={avatarUrl(props.followingProfile)}
            width={50}
            height={50}
            className="rounded-full"
          />
        </div>
        <div>
          <p className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
            {props.followingProfile?.name || "Anon Jerry"}
          </p>
          <span className="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-200 dark:text-gray-900">
            {shortenAddress(props.followingProfile?.address)}
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-start h-3/4">
        <div>
          {props.followingProfile.address ===
            props.userProfile.primaryDelegate && (
            <span className="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
              Primary Delegate
            </span>
          )}
        </div>
        <div>
          {props.followingProfile.address ===
            props.userProfile.secondaryDelegate && (
            <span className="bg-orange-100 text-orange-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">
              Backup Delegate
            </span>
          )}
        </div>
        <div>
          {props.userProfile.followingNo?.includes(
            props.followingProfile.address
          ) && (
            <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">
              Copying No
            </span>
          )}
        </div>
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
