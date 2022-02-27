import { sortWith, prop, descend } from "ramda";
import { useEffect, useState } from "react";
import { $KRAUSE } from "../../../../config";
import type { address } from "../../../../hooks/web3/useGetWeb3";
import { SnapshotPost } from "./SnapshotPost";

export interface SnapshotVote {
  voter: address;
  id: string;
  created: number;
  vp: number; // voting power
  choice: number;
  space: {
    id: string;
  };
  metadata: {
    message: string;
  };
}

interface Props {
  votes: SnapshotVote[];
  provider: any;
  proposal: any;
  signer: any;
  userProfile: any;
}

export default function SnapshotPosts({
  votes,
  userProfile,
  signer,
  provider,
  proposal,
}: Props) {
  return votes ? (
    <div className="flex flex-col space-y-4 dark:bg-gray-800 dark:border-gray-700">
      {votes.map((vote, i) => (
        <SnapshotPost
          postedVote={vote}
          key={i}
          userProfile={userProfile}
          signer={signer}
          provider={provider}
          proposal={proposal}
        />
      ))}
    </div>
  ) : (
    <></>
  );
}
