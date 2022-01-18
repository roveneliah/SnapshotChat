import { sortWith, prop, descend } from "ramda";
import { ForumPost } from "./ForumPost";

export default function ForumPosts({posts, submit, connected}) {
    
    return posts ? (
        <div className="flex flex-col space-y-4 bg-white border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            {sortWith([descend(prop("weight"))])(posts)
                .map((post, i) => ForumPost(submit, connected)(post, i))}
        </div>
    ) : <></>
}