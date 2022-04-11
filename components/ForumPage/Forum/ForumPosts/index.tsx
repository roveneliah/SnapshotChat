import { useEffect, useRef, useState } from "react";
import { useGetVotingPower } from "../../../../hooks/snapshot/useGetVotingPower";
import { balanceOf } from "../../../../utils/web3/balanceOf";
import { getKHWallet } from "../../../../utils/web3/getKHWallet";
import { ForumPost } from "./ForumPost";

interface Props {
  connection: any;
  posts: any;
  proposal: any;
}

export default function ForumPosts({ connection, posts, proposal }: Props) {
  const addresses = useRef(posts?.map((post: any) => post.author));
  const votingPower = useGetVotingPower(
    addresses.current,
    proposal.snapshot,
    connection.provider
  );

  return !posts || posts.length === 0 ? (
    <></>
  ) : (
    <div className="flex flex-col space-y-4 dark:bg-gray-800 dark:border-gray-700">
      {posts.map((post: any, i: number) => (
        <ForumPost
          connection={connection}
          post={post}
          key={i}
          votingPower={votingPower?.[post.author]}
          proposal={proposal}
        />
      ))}
    </div>
  );
}
