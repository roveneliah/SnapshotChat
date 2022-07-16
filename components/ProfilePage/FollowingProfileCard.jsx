import Image from "next/image";
import { avatarUrl } from "../../utils/avatarUrl";
import { shortenAddress } from "../../utils/web3/shortenAddress";
import FollowingDropdown from "./FollowingDropdown";
import { TwitterOutlined } from "@ant-design/icons";
import Link from "next/link";
import { $KRAUSE } from "../../config";
import { useBoolean } from "../../hooks/useBoolean";
import { useBalanceOf } from "../../hooks/useBalanceOf";

export default function FollowingProfileCard(props) {
  const [expanded, toggleExpanded] = useBoolean(false);
  const krauseBalance = useBalanceOf(
    props.connection.provider,
    $KRAUSE,
    props.followingProfile.address
  );

  // TODO: should have logic to prep all the data for the component in one place, just applying a separate function
  const shortenedAddress = shortenAddress(props.followingProfile?.address);
  const unfollow = () => {
    props.userProfile?.unfollow(props.followingProfile.address);
  };
  const formattedKrauseBalance = (krauseBalance / 1e18).toFixed(0);
  const avatar = () => avatarUrl(props.followingProfile);
  const username = () => props.followingProfile?.name || "Jerry";
  const hasTwitter = () => props.followingProfile?.twitterUrl != undefined;
  const twitterUrl = () => props.followingProfile?.twitterUrl;

  return (
    <div
      onClick={toggleExpanded}
      className="flex h-full max-w-full cursor-pointer flex-col justify-between space-y-8 rounded-lg bg-cards/25 px-6 pb-2 pt-4 shadow-md dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="flex flex-row justify-between space-x-2">
        <div className="flex flex-row items-end space-x-4">
          <Image
            src={avatar()}
            alt="avatar"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div className="flex flex-col space-y-1">
            <div className="flex flex-row items-center space-x-4">
              <p className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                {username()}
              </p>
              {hasTwitter() && (
                <Link href={twitterUrl()}>
                  <TwitterOutlined />
                </Link>
              )}
            </div>
            <span className="mr-2 rounded bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-800 dark:bg-gray-200 dark:text-gray-900">
              {shortenedAddress}
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center justify-end space-x-3">
          {expanded && (
            <span className="cursor-pointer rounded-lg bg-cards/50 p-2.5 text-center text-xs font-semibold shadow-md">
              {formattedKrauseBalance} $KRAUSE
            </span>
          )}
          <div onClick={unfollow} className="group w-fit text-center">
            <span className="block cursor-pointer rounded-lg bg-cards/50 p-2.5 text-xs font-semibold shadow-md group-hover:hidden">
              Following
            </span>
            <span className="hidden cursor-pointer rounded-lg bg-cards/50 p-2.5 text-xs font-semibold shadow-md shadow-purple-400 group-hover:block">
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
      {expanded && (
        <div className="">
          {props.followingProfile.about && (
            <p className="rounded-lg border border-slate-500 p-6 font-semibold">
              {props.followingProfile.about}
            </p>
          )}
        </div>
      )}

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
