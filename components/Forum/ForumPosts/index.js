import { sortWith, prop, descend } from "ramda";
import { useEffect, useState } from "react";
import { $KRAUSE } from "../../../config";
import { ForumPost } from "./ForumPost";

export default function ForumPosts({ posts, userProfile }) {
  return posts ? (
    <div className="flex flex-col space-y-4 dark:bg-gray-800 dark:border-gray-700">
      {posts.map((post, i) => (
        <ForumPost post={post} key={i} userProfile={userProfile} />
      ))}
    </div>
  ) : (
    <></>
  );
}
