import { compose, prop } from "ramda"

const PostButton = ({onClick: post}) => (
    <button onClick={post}>Post</button>
)

const PostInput = ({ postText, setPostText }) => (
    <input
        onChange={compose(setPostText, prop("value"), prop("target"))}
        type="text"
        value={postText} />
)

export default ({postText, setPostText, submitPost}) => (
    <div>
        <h1></h1>
        <PostInput postText={postText} setPostText={setPostText} />
        <PostButton onClick={submitPost} />
    </div>
)