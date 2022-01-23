const VoteButtons = ({ votes }) => (
  <div>
    {votes.map((vote, i) => (
      // submit needs to send to firebase db
      <span
        onClick={() =>
          submit(
            JSON.stringify({
              // id
              author,
              post,
              choice: vote.choice,
            })
          )
        }
        className={`bg-${vote.color}-100 text-${vote.color}-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-${color}-200 dark:text-${color}-900`}
        key={i}
      >
        {vote.choice}
      </span>
    ))}
  </div>
);

export const ForumPost = ({ submit, connected, post }) => {
  // TODO: should come from config
  const votes = [
    {
      choice: "Upvote",
      color: "green",
    },
    {
      choice: "Downvote",
      color: "red",
    },
  ];

  const { author, outcome, weight, post: comment } = post;
  return (
    <div className="flex flex-col space-y-4 p-6 bg-white rounded-lg border border-gray-200 shadow-xl dark:bg-gray-800 dark:border-gray-700">
      <div>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {author}
        </h5>
        <span className="bg-purple-100 text-purple-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-purple-200 dark:text-purple-900">
          {outcome}
        </span>
        <span className="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
          {weight} $KRAUSE
        </span>
      </div>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {comment}
      </p>
      {/* {connected && <VoteButtons votes={votes}/>} */}
    </div>
  );
};
