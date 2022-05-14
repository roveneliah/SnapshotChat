import { useForm } from "../../hooks/useForm";
import { useGetSearchResults } from "../../hooks/algolia/useGetSearchResults";
import { Heading } from "../Generics/Headings/Heading";
import { avatarUrl } from "../../utils/avatarUrl";
import { shortenAddress } from "../../utils/web3/shortenAddress";
import Image from "next/image";

export default function JerrySearch(props) {
  const [addressInput, updateAddressInput] = useForm("");
  const searchResults = useGetSearchResults(addressInput);

  return (
    <div className="flex h-[60vh] flex-col space-y-4 overflow-auto rounded-lg border border-gray-200 bg-cards bg-opacity-75 p-8 shadow-xl dark:border-gray-700 dark:bg-gray-800">
      <Heading title="Search" size="xl" className={"font-krausehouse2"} />
      <input
        value={addressInput}
        onChange={updateAddressInput}
        className="block w-full rounded-lg border border-gray-300 bg-cards bg-opacity-25 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder="Search the Jerryverse..."
      />
      <div className="grid h-full grid-cols-1 overflow-auto">
        {searchResults
          .filter(
            ({ address }) => !props.userProfile.following?.includes(address)
          )
          .filter(({ address }) => address !== props.userProfile.address)
          .map((profile, i) => (
            <div
              key={i}
              className="my-2 flex flex-col justify-between space-y-5 rounded-lg border border-gray-200 bg-cards bg-opacity-25 p-6 shadow-md dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex flex-row space-x-3 rounded-lg">
                <div>
                  <Image
                    src={avatarUrl(profile)}
                    alt="avatar"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <div className="flex flex-row space-x-2">
                    <p className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                      {profile.name || "Anon Jerry"}
                    </p>
                  </div>
                  <div>
                    {profile.address && (
                      <span className="mr-2 rounded bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-800 dark:bg-gray-200 dark:text-gray-900">
                        {shortenAddress(profile.address)}
                      </span>
                      // <span className="border-gray-800 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded border dark:border-gray-200 dark:text-gray-900">
                      //   {shortenAddress(profile.address)}
                      // </span>
                    )}
                  </div>
                </div>
              </div>
              {/* <div className="flex flex-col space-y-3">
                <div>
                  {profile.roles?.map((role, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-200 dark:text-gray-900"
                    >
                      {role}
                    </span>
                  ))}
                </div>
                <p className="text-xs font-bold tracking-tight text-gray-900 dark:text-white">
                  {profile.about}
                </p>
              </div> */}
              <div className="flex flex-row justify-start">
                {/* <Button
                  title="Follow"
                  color="purple"
                  onClick={() => props.userProfile.follow(profile.address)}
                /> */}
                <span
                  onClick={() => props.userProfile.follow(profile.address)}
                  className="mr-2 rounded bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-800 dark:bg-gray-200 dark:text-gray-900"
                >
                  Follow
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
