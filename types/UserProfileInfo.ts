import { address } from "./Address";

export interface UserProfileInfo {
  name: string;
  about: string;
  address: address;
  discordUsername: string;
  filters: string[];
  profileImage: string;
  projects: string[];
  roles: string[];
  twitterUrl: string;
  following: address[];
  followingNo: address[];
}
