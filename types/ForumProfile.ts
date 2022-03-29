import { address } from "./Address";

export interface ForumProfile {
  filters: string[]; // TODO: should be an enum
  primaryDelegate: address;
  secondaryDelegate: address;
  following: address[];
  followingNo: address[];
  follow: (address: address) => void; // TODO: is void return correct? // we should make sure the user is signed in in order to follow
  unfollow: (address: address) => void;
  followNo: (address: address) => void;
  unfollowNo: (address: address) => void;
  clearPrimaryDelegate: () => void;
  clearSecondaryDelegate: () => void;
}
