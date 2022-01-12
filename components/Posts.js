
import { Post } from "./Post";
export const Posts = ({posts, submit, connected}) => posts.map(Post(submit, connected));