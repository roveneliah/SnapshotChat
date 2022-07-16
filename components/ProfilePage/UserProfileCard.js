import Image from "next/image";
import Link from "next/link";
import { avatarUrl } from "../../utils/avatarUrl";
import { shortenAddress } from "../../utils/web3/shortenAddress";

import { ProfileViews } from "./ProfileView";

export default function UserProfileCard(props) {
  const { Following, Search, Wallet, Store, MyJerry, Governance } =
    ProfileViews;
  const button =
    "flex cursor-pointer flex-row space-x-3 rounded-full px-3 py-2 pb-3 lg:rounded-lg";
  const buttonSelected =
    "flex cursor-pointer flex-row space-x-3 rounded-full px-3 py-2 pb-3 border border-gray-400 bg-gray-300 lg:rounded-lg";

  return (
    props.userProfile && (
      <div className="flex flex-col space-y-2 rounded-lg border border-gray-200 bg-cards p-6 opacity-75 shadow-md dark:border-gray-700 dark:bg-gray-800">
        {/* <div className="flex flex-col items-center">
          {props.userProfile?.name ? (
            <div>
              <span className="mr-2 rounded bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-800 dark:bg-gray-200 dark:text-gray-900">
                {shortenAddress(props.wallet?.address)}
              </span>
            </div>
          ) : (
            <div>
              <span className="text-md mr-2 rounded bg-orange-100 px-2.5 py-0.5 font-semibold text-orange-800 dark:bg-orange-200 dark:text-orange-900">
                <a href="https://roster.krausehouse.club">Join the roster!</a>
              </span>
            </div>
          )}
        </div> */}
        <div>
          <a className="p-4 font-krausehouse2 text-xl">Profile</a>
          <div className="m-4 flex cursor-pointer flex-row items-center justify-start space-x-4 rounded-lg border border-gray-200 p-4 shadow-md hover:shadow-xl dark:border-gray-700">
            <Image
              src={avatarUrl(props.userProfile)}
              alt="feeling cute, might delete"
              width={100}
              height={100}
              className="mb-5 rounded-full shadow-lg"
            />
            <div className="flex flex-col items-start">
              {props.userProfile?.name ? (
                <h3 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                  {props.userProfile?.name}
                </h3>
              ) : (
                <span className="mr-2 rounded bg-gray-100 px-2.5 py-0.5 text-lg font-semibold text-gray-800 dark:bg-gray-200 dark:text-gray-900">
                  {shortenAddress(props.userProfile?.address)}
                </span>
              )}
              <div>
                <span className="mr-2 whitespace-nowrap rounded bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-purple-800 dark:bg-purple-200 dark:text-purple-900">
                  {props.wallet?.$KRAUSE.toFixed(0) || 0} $KRAUSE
                </span>
              </div>
              {props.userProfile?.roles?.map((role, i) => (
                <div key={i}>
                  <span className="mr-2 rounded bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-800 dark:bg-gray-200 dark:text-gray-900">
                    {role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-row space-y-3 p-4 font-krausehouse2 lg:flex-col lg:justify-start">
          <div
            onClick={() => props.setView(Following)}
            className={props.view === Following ? buttonSelected : button}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <a className="hidden lg:block">Following</a>
          </div>
          <div
            onClick={() => props.setView(Search)}
            className={props.view === Search ? buttonSelected : button}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <a className="hidden lg:block">Search</a>
          </div>
          <div
            onClick={() => props.setView(Governance)}
            className={props.view === Governance ? buttonSelected : button}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
              />
            </svg>
            <a className="hidden lg:block">Governance</a>
          </div>
          <div
            onClick={() => props.setView(Wallet)}
            className={props.view === Wallet ? buttonSelected : button}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <a className="hidden lg:block">Wallet</a>
          </div>
          <div
            onClick={() => props.setView(Store)}
            className={
              props.view === ProfileViews.Store ? buttonSelected : button
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <a className="hidden lg:block">Store</a>
          </div>
          <div
            onClick={() => props.setView(MyJerry)}
            className={
              props.view === ProfileViews.MyJerry ? buttonSelected : button
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <a className="hidden lg:block">MyJerry</a>
          </div>
        </div>
      </div>
    )
  );
}
