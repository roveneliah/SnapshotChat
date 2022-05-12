import { Heading } from "../Generics/Headings/Heading";
import FollowingProfileCard from "./FollowingProfileCard";

export default function FollowingBox(props: any) {
  return (
    <div className="flex flex-col space-y-4 p-6 bg-cards bg-opacity-75 rounded-lg border border-gray-200 shadow-xl dark:bg-gray-800 dark:border-gray-700">
      <div>
        <div className="pl-3">
          <Heading title="Following" size="xl" className="font-krausehouse2" />
        </div>
        <div className="grid grid-cols-2">
          {props.following?.map((followingProfile: any, i: number) => (
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
  );
}
