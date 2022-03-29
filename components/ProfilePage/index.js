import { useGetProfiles } from "../../hooks/firestore/useGetProfiles";
import SignedOutView from "./SignedOutView";
import { LoadingView } from "./LoadingView";
import { ProfileView } from "./ProfileView";

export default function ProfilePage({ connection }) {
  const following = useGetProfiles(connection.userProfile?.following);
  return !connection.signer ? (
    <SignedOutView />
  ) : !connection.userProfile ? (
    <LoadingView />
  ) : (
    <ProfileView connection={connection} following={following}></ProfileView>
  );
}
