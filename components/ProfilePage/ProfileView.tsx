import UserProfileCard from "./UserProfileCard";
import JerrySearch from "./JerrySearch";
import FollowingBox from "./FollowingBox";
import { Heading } from "../Generics/Headings/Heading";

export function ProfileView(props: any) {
  return (
    <div className="flex flex-row justify-center space-x-10">
      <div className="flex flex-col space-y-3 w-[30vw]">
        <UserProfileCard
          userProfile={props.connection.userProfile}
          wallet={props.connection.wallet}
        />
        <div className="flex flex-col space-y-4 p-8 bg-cards bg-opacity-75 rounded-lg border border-gray-200 shadow-xl ">
          <Heading
            title="Quick Actions"
            size="xl"
            className="font-krausehouse2"
          />
        </div>
        <JerrySearch userProfile={props.connection.userProfile} />
      </div>
      <div className="flex flex-col space-y-5 w-1/2">
        <div className="flex flex-col space-y-4 p-8 bg-cards bg-opacity-75 rounded-lg border border-gray-200 shadow-xl ">
          <Heading title="My Jerry" size="xl" className="font-krausehouse2" />
        </div>
        <div className="flex flex-col space-y-4 p-8 bg-cards bg-opacity-75 rounded-lg border border-gray-200 shadow-xl ">
          <Heading title="My Squad" size="xl" className="font-krausehouse2" />
        </div>
        <FollowingBox
          userProfile={props.connection.userProfile}
          following={props.following}
        />
      </div>
    </div>
  );
}
