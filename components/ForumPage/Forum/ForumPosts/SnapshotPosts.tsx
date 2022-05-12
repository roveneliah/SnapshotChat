import { SnapshotPost } from "./SnapshotPost";
import { SnapshotVote } from "../../../../types/SnapshotVote";

interface Props {
  connection: any;
  votes: SnapshotVote[];
  proposal: any;
  votingPower: any;
}

export default function SnapshotPosts({
  connection,
  votes,
  proposal,
  votingPower,
}: Props) {
  return votes && votes.length > 0 ? (
    <div className="flex flex-col space-y-4">
      {votes.map((vote, i) => (
        <SnapshotPost
          connection={connection}
          postedVote={vote}
          key={i}
          votingPower={votingPower?.[vote.voter]}
          proposal={proposal}
        />
      ))}
    </div>
  ) : (
    <></>
  );
}
