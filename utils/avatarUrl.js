import { buildAvatarUrl } from "./buildAvatarUrl";

export const avatarUrl = (userProfile) => {
  const defaultUserAvatar =
    "https://firebasestorage.googleapis.com/v0/b/krause-house-roster.appspot.com/o/images%2FidCDdt7eqexllcfsd0ZfAnA14aZ?alt=media&token=d96d6329-3e44-4d22-b1b8-b2e3cc55108a";

  return userProfile.discord?.id && userProfile.discord?.avatar
    ? buildAvatarUrl(userProfile.discord) // use discord avatar if available
    : userProfile.profileImage || defaultUserAvatar;
};
