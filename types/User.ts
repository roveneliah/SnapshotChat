import { Wallet } from "./Wallet";
import { ForumProfile } from "./ForumProfile";
import { DiscordProfile } from "./DiscordProfile";
import { address } from "./Address";

export interface User {
  address: address;
  wallet: Wallet;
  profile?: {
    name: string;
    about: string;
    discordUsername: string;
    profileImage: string;
    projects: string[];
    roles: string[];
    twitterUrl: string;
  };
  forum: ForumProfile;
  discord: DiscordProfile;
}
