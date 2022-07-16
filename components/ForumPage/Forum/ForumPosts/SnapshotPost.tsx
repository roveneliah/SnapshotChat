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
    <div className="flex flex-col space-y-7 rounded-lg border border-gray-200 bg-cards p-6 shadow-xl">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row justify-start space-x-2">
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
            <div className="mb-2 flex flex-row justify-start space-x-2">
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
              <h5 className="text-md self-center font-bold tracking-tight text-gray-900 dark:text-white">
                {/*  need to get the from by the author address */}
                {userIsAuthor ? authorUsername : "You"}
              </h5>
            </div>
            <div className="flex flex-row items-center space-x-2">
              <span className="mr-2 rounded bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-800 ">
                {shortenAddress(authorAddr)}
              </span>
              {userProfile?.primaryDelegate === authorAddr && (
                <span className="mr-2 rounded bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-800 dark:bg-red-200 dark:text-red-900">
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
        <div className="flex flex-row items-center justify-between space-x-2">
          <div>
            <span className="mr-2 rounded bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-800 dark:bg-red-200 dark:text-red-900">
              Vote
            </span>
            <span className="mr-2 rounded bg-orange-100 px-2.5 py-0.5 text-xs font-semibold text-orange-800 dark:bg-orange-200 dark:text-orange-900">
              {outcome}
            </span>
            {votingPower && (
              <span className="mr-2 rounded bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-purple-800 dark:bg-purple-700 dark:text-purple-300">
                {votingPower} $KRAUSE
              </span>
            )}
          </div>
          {proposal.state === "active" && (
            <div>
              <span
                onClick={voteWithAuthor}
                className="mr-2 cursor-pointer rounded bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-purple-800 dark:bg-purple-700 dark:text-purple-300"
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
          <div className="flex h-40 flex-col space-y-12 rounded-lg border border-gray-200 p-3">
            <p className="m-3 font-normal text-gray-700 dark:text-gray-400">
              {comment}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
