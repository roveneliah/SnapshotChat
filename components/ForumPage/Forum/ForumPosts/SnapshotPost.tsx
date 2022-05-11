import Image from "next/image";
import { useLoadProfile } from "../../../../hooks/firestore/useLoadProfile";
import { avatarUrl } from "../../../../utils/avatarUrl";
import { shortenAddress } from "../../../../utils/web3/shortenAddress";
import { FollowButton, SelfIcon, StarButton } from "../../../Icons/icons";
import { VoteButtons } from "./VoteButtons";
import { SnapshotVote } from "../../../../types/SnapshotVote";

interface Props {
  connection: any;
  postedVote: SnapshotVote;
  proposal: any;
  votingPower: number;
}

export const SnapshotPost = ({
  connection,
  postedVote,
  proposal,
  votingPower,
}: Props) => {
  const { snapshotVote, userProfile } = connection;
  const { voter: author, vp, metadata, choice } = postedVote;
  const comment = metadata.message;
  const authorAddr = author.toLowerCase();
  const outcome: string = proposal.choices[postedVote.choice - 1];

  const authorProfile = useLoadProfile(authorAddr);
  const authorAvatarUrl = authorProfile && avatarUrl(authorProfile);
  const authorUsername = authorProfile?.discordUsername;

  const voteWithAuthor = () =>
    snapshotVote({
      choice,
      proposalId: proposal.id,
      voteType: proposal.type,
      space: proposal.space.id,
      message: comment,
      mirror: authorAddr,
    });

  const userIsAuthor = authorAddr !== userProfile?.address;
  return (
    <div className="flex flex-col space-y-7 p-6 bg-cards rounded-lg border border-gray-200 shadow-xl dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row space-x-2 justify-start">
          {authorAvatarUrl && (
            <Image
              src={authorAvatarUrl || "kh_holo.png"}
              alt="avatar"
              width={60}
              height={60}
              className="rounded-full"
            />
          )}
          <div className="flex flex-col space-y-0">
            <div className="flex flex-row mb-2 space-x-2 justify-start">
              {userProfile &&
                (userProfile.following?.includes(authorAddr)
                  ? StarButton({
                      removeFriend: () => userProfile?.unfollow(authorAddr),
                    })
                  : userIsAuthor
                  ? FollowButton({
                      addFriend: () => userProfile?.follow(authorAddr),
                    })
                  : SelfIcon())}
              <h5 className="self-center text-md font-bold tracking-tight text-gray-900 dark:text-white">
                {/*  need to get the from by the author address */}
                {userIsAuthor ? authorUsername : "You"}
              </h5>
            </div>
            <div className="flex flex-row space-x-2 items-center">
              <span className="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-200 dark:text-gray-900">
                {shortenAddress(authorAddr)}
              </span>
              {userProfile?.primaryDelegate === authorAddr && (
                <span className="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
                  Primary Delegate
                </span>
              )}
            </div>
          </div>
        </div>
        {/* <div className="flex flex-row items-start space-x-2 justify-between">
          <div>
            <span className="bg-orange-100 text-orange-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">
              {outcome}
            </span>
            <span className="bg-purple-100 text-purple-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-purple-700 dark:text-purple-300">
              {wallet?.$KRAUSE} $KRAUSE
            </span>
          </div>
        </div> */}
      </div>

      <div className="flex flex-col space-y-3">
        <div className="flex flex-row space-x-2 justify-between items-center">
          <div>
            <span className="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
              Vote
            </span>
            <span className="bg-orange-100 text-orange-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">
              {outcome}
            </span>
            {votingPower && (
              <span className="bg-purple-100 text-purple-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-purple-700 dark:text-purple-300">
                {votingPower} $KRAUSE
              </span>
            )}
          </div>
          {proposal.state === "active" && (
            <div>
              <span
                onClick={voteWithAuthor}
                className="bg-purple-100 text-purple-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-purple-700 dark:text-purple-300"
              >
                Vote With {authorUsername || authorAddr.substring(0, 6)}...
              </span>
            </div>
          )}
          {/* <div>
            <VoteButtons proposalId={proposalId} post={post} signer={signer} />
          </div> */}
        </div>
        {comment && (
          <div className="flex flex-col h-40 space-y-12 p-3 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <p className="m-3 font-normal text-gray-700 dark:text-gray-400">
              {comment}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
