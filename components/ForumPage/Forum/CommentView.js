import ForumPosts from "./ForumPosts";
import CommentBox from "./CommentBox";
import SnapshotPosts from "./ForumPosts/SnapshotPosts";

// TODO: MAKE A BOX FOR FOLLOWS THAT ISN'T A POST (not everyone posts)
export function CommentView(props) {
  return (
    <div className="space-y-4">
      {props.myVote?.length > 0 ? (
        <SnapshotPosts
          connection={props.connection}
          votes={props.myVote}
          proposalId={props.proposal.id}
          proposal={props.proposal}
          votingPower={props.votingPower}
        />
      ) : (
        props.myPosts && (
          <ForumPosts
            connection={props.connection}
            posts={props.myPosts}
            proposalId={props.proposal.id}
            proposal={props.proposal}
          />
        )
      )}
      {props.myRetrospectivePosts && (
        <ForumPosts
          connection={props.connection}
          posts={props.myRetrospectivePosts}
          proposalId={props.proposal.id}
          proposal={props.proposal}
        />
      )}
      <CommentBox connection={props.connection} proposal={props.proposal} />
    </div>
  );
}
