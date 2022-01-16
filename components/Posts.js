import { sortWith, prop, descend } from "ramda";
import { Post } from "./Post";

export const Posts = ({posts, submit, connected}) => {
    
    // console.log(sortWith([descend(prop("weight"))])(posts));
    return (
        <div className="flex flex-col space-y-4 bg-white border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        {sortWith([descend(prop("weight"))])(posts)
            .map(Post(submit, connected))}
        </div>
    );
}