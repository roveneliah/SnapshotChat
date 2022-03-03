import { useGetProfiles } from "../../hooks/firestore/useGetProfiles";
import UserProfileCard from "./UserProfileCard";
import JerrySearch from "./JerrySearch";
import FollowingBox from "./FollowingBox";
import SignedOutView from "./SignedOutView";

export default function ProfilePage({ connection }) {
  const following = useGetProfiles(connection.userProfile?.following);
  return !connection.userProfile ? (
    <SignedOutView />
  ) : (
    <div className="flex flex-row justify-center space-x-10">
      <UserProfileCard
        userProfile={connection.userProfile}
        wallet={connection.wallet}
      />
      <div className="flex flex-col space-y-5 w-1/2">
        <FollowingBox
          userProfile={connection.userProfile}
          following={following}
        />
        <JerrySearch userProfile={connection.userProfile} />
      </div>
    </div>
  );
}
