import { useState } from "react";
import { Heading } from "../Generics/Headings/Heading";
import FollowingProfileCard from "./FollowingProfileCard";

export default function FollowingBox(props: any) {
  return (
    <div className="flex flex-col space-y-4 rounded-lg border border-gray-200 bg-cards bg-opacity-75 p-6 shadow-xl dark:border-gray-700 dark:bg-gray-800">
      <Heading
        title="Squad"
        size="xl"
        className="px-2 pt-2 font-krausehouse2"
      />
      <div className="flex flex-row space-x-2 px-2">
        <a className="cursor-pointer rounded-lg bg-black/5 py-1 px-3 text-sm font-semibold hover:bg-black/10">
          Inner Circle
        </a>
        <a className="cursor-pointer rounded-lg bg-black/5 py-1 px-3 text-sm font-semibold hover:bg-black/10">
          Delegates
        </a>
      </div>
      <div className="grid grid-cols-1">
        {props.following?.map((followingProfile: any, i: number) => (
          <div className="m-2" key={i}>
            <FollowingProfileCard
              key={i}
              userProfile={props.userProfile}
              followingProfile={followingProfile}
              connection={props.connection}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
