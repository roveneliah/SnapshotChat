import UserProfileCard from "./UserProfileCard";
import JerrySearch from "./JerrySearch";
import FollowingBox from "./FollowingBox";

export function ProfileView(props: any) {
  return (
    <div className="flex flex-row justify-center space-x-10">
      <UserProfileCard
        userProfile={props.connection.userProfile}
        wallet={props.connection.wallet}
      />
      <div className="flex flex-col space-y-5 w-1/2">
        <FollowingBox
          userProfile={props.connection.userProfile}
          following={props.following}
        />
        <JerrySearch userProfile={props.connection.userProfile} />
      </div>
    </div>
  );
}
