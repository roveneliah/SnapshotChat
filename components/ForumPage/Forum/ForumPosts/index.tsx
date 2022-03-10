import { useEffect, useRef, useState } from "react";
import { useGetVotingPower } from "../../../../hooks/snapshot/useGetVotingPower";
import { ForumPost } from "./ForumPost";

interface Props {
  connection: any;
  posts: any;
  proposal: any;
}

export default function ForumPosts({ connection, posts, proposal }: Props) {
  const addresses = useRef(posts.map((post: any) => post.author));
  const votingPower = useGetVotingPower(addresses.current, proposal.snapshot);

  return posts ? (
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
  ) : (
    <></>
  );
}