export const VoteButtons = ({ proposalId, post, signer }) => {
  const voteCounts = Object.values(post.votes || []).reduce((counter, vote) => {
    return {
      ...counter,
      [vote.choice]: counter[vote.choice] ? counter[vote.choice] + 1 : 1,
    };
  }, {});
  return (
    <div>
      {[
        {
          choice: "Upvote",
          color: "green",
        },
        {
          choice: "Downvote",
          color: "red",
        },
      ].map((vote, i) => (
        // submit needs to send to firebase db
        <span
          onClick={() => addVoteToForumPost(signer, proposalId, post, vote)}
          className={`bg-${vote.color}-100 text-${vote.color}-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-${vote.color}-200 dark:text-${vote.color}-900`}
          key={i}
        >
          {vote.choice}{" "}
          {voteCounts[vote.choice] && `(${voteCounts[vote.choice]})`}
        </span>
      ))}
    </div>
  );
};
