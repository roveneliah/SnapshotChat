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
    <div className="rounded-lg border border-gray-200 bg-cards px-6 py-4 pb-8 opacity-75 shadow-xl">
      <div className="flex flex-col space-y-2 rounded-lg border-gray-200">
        <div className="flex flex-row items-start space-x-3 py-2">
          {authorAvatarUrl && (
            <div>
              <Image
                src={authorAvatarUrl}
                alt="avatar"
                width={50}
                height={50}
                className="rounded-full"
              />
            </div>
          )}
          <div className="flex w-full flex-col items-start">
            <div className="mb-2 flex w-full flex-row justify-between space-x-2">
              <div>
                {userProfile &&
                  (userProfile.following?.includes(authorAddr) ? (
                    StarButton({
                      removeFriend: () => userProfile?.unfollow(authorAddr),
                    })
                  ) : userIsAuthor ? (
                    FollowButton({
                      addFriend: () => userProfile?.follow(authorAddr),
                    })
                  ) : (
                    <></>
                  ))}
                <h5 className="self-center text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {/*  need to get the from by the author address */}
                  {userIsAuthor ? authorUsername : "You"}
                </h5>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <div className="flex flex-row space-x-1">
                  {retrospective ? (
                    <Badge title="Retrospective" color="gray" size="md" />
                  ) : (
                    <Badge title="Opinion" color="gray" size="md" />
                  )}
                  <Badge title={outcome} color="orange" size="md" />
                  {votingPower && (
                    <Badge
                      title={`${votingPower} $KRAUSE`}
                      color="purple"
                      size="md"
                    />
                  )}
                </div>
              </div>
            </div>
            {/* <span className="bg-gray-100 text-gray-800 text-xs font-semibold -mt-1 px-2.5 py-0.5 rounded">
              {shortenAddress(authorAddr)}
            </span> */}

            {userProfile?.primaryDelegate === authorAddr && (
              <div>
                <span className="mr-2 rounded bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-800 dark:bg-red-200 dark:text-red-900">
                  Primary Delegate
                </span>
                <div className="flex flex-col space-y-0">
                  <div className="mb-2 flex flex-row justify-start space-x-2">
                    {userProfile &&
                      (userProfile.following?.includes(authorAddr)
                        ? StarButton({
                            removeFriend: () =>
                              userProfile?.unfollow(authorAddr),
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
                    <span className="mr-2 rounded bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-800">
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
            )}
          </div>
        </div>
        <p className="rounded-lg border px-6 py-8 font-semibold text-gray-700 dark:text-gray-400">
          {comment}
        </p>
        {/* <div className="flex flex-col space-y-3"> */}
        {/* <div className="flex flex-row space-x-2 justify-between items-end"> */}
        {/* {proposal.state === "active" && (
              <div>
                <span
                  onClick={voteWithAuthor}
                  className="bg-purple-100 text-purple-800 cursor-pointer text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-purple-700 dark:text-purple-300"
                >
                  Vote With {authorUsername}
                </span>
              </div>
            )} */}

        {/* <div>
              <VoteButtons
                proposalId={proposal.id}
                post={post}
                signer={connection.signer}
              />
            </div> */}
        {/* </div> */}
      </div>
    </div>
  );
};
