import Image from "next/image";
import { avatarUrl } from "../../utils/avatarUrl";
import { shortenAddress } from "../../utils/web3/shortenAddress";
import FollowingDropdown from "./FollowingDropdown";
import { TwitterOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function FollowingProfileCard(props) {
  return (
    <div className="flex h-full max-w-full flex-col justify-between space-y-3 rounded-lg bg-cards/25 px-6 pb-2 pt-4 shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-row justify-between space-x-2">
        <div className="flex flex-row items-end space-x-4">
          <Image
            src={avatarUrl(props.followingProfile)}
            alt="avatar"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div className="flex flex-col space-y-1">
            <div className="flex flex-row items-center space-x-4">
              <p className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                {props.followingProfile?.name || "Jerry"}
              </p>
              {props.followingProfile?.twitterUrl && (
                <Link href={props.followingProfile?.twitterUrl}>
                  <TwitterOutlined />
                </Link>
              )}
            </div>
            <span className="mr-2 rounded bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-800 dark:bg-gray-200 dark:text-gray-900">
              {shortenAddress(props.followingProfile?.address)}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end justify-center">
          <div
            onClick={() =>
              props.userProfile?.unfollow(props.followingProfile.address)
            }
            className=""
          >
            <span className="cursor-pointer rounded-lg bg-cards/50 p-2.5 text-xs font-semibold shadow-md shadow-purple-300">
              Unfollow
            </span>
          </div>
          {/* <FollowingDropdown
            unfollow={() =>
              props.userProfile?.unfollow(props.followingProfile.address)
            }
            userProfile={props.userProfile}
            followingProfile={props.followingProfile}
            setPrimaryDelegate={() =>
              props.userProfile?.setPrimaryDelegate(
                props.followingProfile.address
              )
            }
            clearPrimaryDelegate={() =>
              props.userProfile?.clearPrimaryDelegate()
            }
          /> */}
        </div>
      </div>

      {/* WILL ADD BACK FOLLOWING LOGIC LATER */}
      <div className="flex h-3/4 flex-col justify-start">
        <div>
          {props.followingProfile.address ===
            props.userProfile.primaryDelegate && (
            <span className="mr-2 rounded bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-800 dark:bg-red-200 dark:text-red-900">
              Primary Delegate
            </span>
          )}
        </div>
        <div>
          {props.followingProfile.address ===
            props.userProfile.secondaryDelegate && (
            <span className="mr-2 rounded bg-orange-100 px-2.5 py-0.5 text-xs font-semibold text-orange-800 dark:bg-orange-200 dark:text-orange-900">
              Backup Delegate
            </span>
          )}
        </div>
        <div>
          {props.userProfile.followingNo?.includes(
            props.followingProfile.address
          ) && (
            <span className="mr-2 rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-semibold text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900">
              Copying No
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
