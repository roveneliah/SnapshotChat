import { sortWith, prop, descend } from "ramda";
import { useEffect, useState } from "react";
import { $KRAUSE } from "../../../config";
import { ForumPost } from "./ForumPost";

export default function ForumPosts({ provider, posts, submit }) {
  const sortTokenWeighted = sortWith([descend(prop("weight"))]);

  return posts ? (
    <div className="flex flex-col space-y-4 dark:bg-gray-800 dark:border-gray-700">
      {sortTokenWeighted(posts).map((post, i) => (
        <ForumPost submit={submit} post={post} key={i} />
      ))}
    </div>
  ) : (
    <></>
  );
}
