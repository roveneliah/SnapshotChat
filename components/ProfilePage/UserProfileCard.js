import Image from "next/image";
import { avatarUrl } from "../../utils/avatarUrl";
import { shortenAddress } from "../../utils/web3/shortenAddress";

export default function UserProfileCard(props) {
  return (
    props.userProfile && (
      <div className="flex flex-col space-y-5 rounded-lg border border-gray-200 bg-cards p-5 opacity-75 shadow-md dark:border-gray-700 dark:bg-gray-800">
        <div className="flex flex-col items-center">
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
        </div>
        <div className="m-6 flex flex-row items-center justify-start space-x-4 rounded-lg border border-gray-200 p-6 dark:border-gray-700">
          <Image
            src={avatarUrl(props.userProfile)}
            alt="feeling cute, might delete"
            width={100}
            height={100}
            className="mb-5 rounded-full shadow-lg"
          />
          <div className="flex flex-col items-center">
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
                {props.wallet?.$KRAUSE || 0} $KRAUSE
              </span>
            </div>
            {/* {props.userProfile?.roles?.map((role, i) => (
              <div key={i}>
                <span className="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-200 dark:text-gray-900">
                  {role}
                </span>
              </div>
            ))} */}
          </div>
          {/* <div className="pt-10">
            <div className="flex flex-col items-center space-y-1">
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
          </div> */}
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
    )
  );
}
