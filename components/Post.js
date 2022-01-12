


export const Post = (submit, connected) => (({author, post, weight, outcome}) => (
    <div>
        <h1>{author}</h1>
        <p>{post}</p>
        <p style={{color: "green"}}>{outcome} {weight} $KRAUSE</p>
        {connected && (
        <>
            <button onClick={() => submit("upvote")}>Upvote</button>
            <button onClick={() => submit("downvote")}>Downvote</button>
        </>
        )}
    </div>
));