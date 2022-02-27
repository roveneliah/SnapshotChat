import { sortWith, prop, descend } from "ramda";
import { useEffect, useRef, useState } from "react";
import { $KRAUSE } from "../../../../config";
import { useGetVotingPower } from "../../../../hooks/snapshot/useGetVotingPower";
import { ForumPost } from "./ForumPost";

export default function ForumPosts({
  posts,
  proposalId,
  userProfile,
  signer,
  provider,
  proposal,
}) {
  const addresses = useRef(posts.map((post) => post.author));
  const votingPower = useGetVotingPower(addresses.current, proposal.snapshot);

  return posts ? (
    <div className="flex flex-col space-y-4 dark:bg-gray-800 dark:border-gray-700">
      {posts.map((post, i) => (
        <ForumPost
          post={post}
          key={i}
          userProfile={userProfile}
          votingPower={votingPower?.[post.author]}
          signer={signer}
          provider={provider}
          proposalId={proposalId}
          proposal={proposal}
        />
      ))}
    </div>
  ) : (
    <></>
  );
}
