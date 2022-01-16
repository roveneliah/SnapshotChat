


export const Post = (submit, connected) => (({author, post, weight, outcome}) => (
    <div className="flex flex-col space-y-4 p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
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
            {post}
        </p>
        {connected && (
            <div>
                <span onClick={() => submit("upvote")} className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
                    Upvote
                </span>
                <span onClick={() => submit("downvote")} className="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
                    Downvote
                </span>
            </div>
        )}
    </div>
));