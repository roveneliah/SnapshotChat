import Image from "next/image";
import { useEffect, useState } from "react";
import { useLoadProfile } from "../../../../hooks/firestore/useLoadProfile";
import { avatarUrl } from "../../../../utils/avatarUrl";
import { addVoteToForumPost } from "../../../../utils/firestore";
import { shortenAddress } from "../../../../utils/web3/shortenAddress";
import { Badge } from "../../../Generics/Badge";
import { Row } from "../../../Generics/Row";
import { SelfIcon, StarButton, FollowButton } from "../../../Icons/icons";
import { VoteButtons } from "./VoteButtons";

export const ForumPost = ({ connection, post, proposal, votingPower }) => {
  const { snapshotVote, userProfile } = connection;
  const { author, outcome, wallet, post: comment, retrospective } = post;

  // TODO: REFACTOR THIS
  const authorAddr = author.toLowerCase();
  const authorProfile = useLoadProfile(authorAddr);
  const authorAvatarUrl = authorProfile && avatarUrl(authorProfile);
  const authorUsername = authorProfile?.discordUsername;
  const choice = proposal.choices.indexOf(outcome) + 1;

  const voteWithAuthor = () =>
    snapshotVote({
      choice, // TODO: need to get from string -> int
      proposalId: proposal.id,
      voteType: proposal.type,
      space: proposal.space.id,
      message: comment,
      mirror: authorAddr,
    });

  const userIsAuthor = authorAddr !== userProfile?.address;
  return (
    <div className="flex flex-col space-y-7 p-6 bg-white rounded-lg border border-gray-200 shadow-xl dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row space-x-2 justify-start">
          {authorAvatarUrl && (
            <Image
              src={authorAvatarUrl}
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
          <Row space={1}>
            {retrospective ? (
              <Badge title="Retrospective" color="gray" size="xs" />
            ) : (
              <Badge title="Opinion" color="gray" size="xs" />
            )}
            {/* <span className="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-200 dark:text-gray-900">
              Opinion
            </span> */}
            <Badge title={outcome} color="orange" size="xs" />
            {votingPower && (
              <Badge
                title={`${votingPower} $KRAUSE`}
                color="purple"
                size="xs"
              />
            )}
            {/* <span className="bg-orange-100 text-orange-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">
              {outcome}
            </span>
            <span className="bg-purple-100 text-purple-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-purple-700 dark:text-purple-300">
              {votingPower} $KRAUSE
            </span> */}
          </Row>
          {proposal.state === "active" && (
            <div>
              <span
                onClick={voteWithAuthor}
                className="bg-purple-100 text-purple-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-purple-700 dark:text-purple-300"
              >
                Vote With {authorUsername}
              </span>
            </div>
          )}
          {/* <div>
            <VoteButtons proposalId={proposalId} post={post} signer={signer} />
          </div> */}
        </div>
        <div className="flex flex-col h-40 space-y-12 p-3 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <p className="m-3 font-normal text-gray-700 dark:text-gray-400">
            {comment}
          </p>
        </div>
      </div>
    </div>
  );
};
