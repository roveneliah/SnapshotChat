import { Heading } from "../Generics/Headings/Heading";
import Image from "next/image";
import { useGetFollowingProfiles } from "../../hooks/firestore/useGetFollowingProfiles";
import UserProfileCard from "./UserProfileCard";
import FollowingProfileCard from "./FollowingProfileCard";
import JerrySearch from "./JerrySearch";

export default function ProfilePage(props) {
  const following = useGetFollowingProfiles(props.userProfile?.following);
  return props.userProfile ? (
    <div className="flex flex-row justify-center space-x-10">
      <UserProfileCard userProfile={props.userProfile} wallet={props.wallet} />
      <div className="flex flex-col space-y-5 w-1/2">
        <div className="flex flex-col space-y-4 p-6 bg-white rounded-lg border border-gray-200 shadow-xl dark:bg-gray-800 dark:border-gray-700">
          <div>
            <div className="pl-3">
              <Heading title="Following" size="xl" />
            </div>
            <div className="grid grid-cols-3">
              {following?.map((followingProfile, i) => (
                <div className="m-2" key={i}>
                  <FollowingProfileCard
                    key={i}
                    userProfile={props.userProfile}
                    followingProfile={followingProfile}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <JerrySearch userProfile={props.userProfile} />
      </div>
    </div>
  ) : (
    <SignedOutView />
  );
}

function SignedOutView() {
  return (
    <div className="flex flex-row justify-center space-x-3">
      <div className="flex flex-col w-2/3 space-y-4 p-6 bg-white rounded-lg border border-gray-200 shadow-xl dark:bg-gray-800 dark:border-gray-700">
        <Heading title="Connect your wallet to view your profile." size="xl" />
        <Image
          src="https://i.giphy.com/media/1AjFHLpytkqt0qYDcW/giphy.webp"
          alt="DO IT"
          height={800}
          width={-1} // wtf
        />
      </div>
    </div>
  );
}
