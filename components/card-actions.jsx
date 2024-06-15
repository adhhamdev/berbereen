"use client";
import { useState } from "react";

import {
  ArrowPathRoundedSquareIcon,
  BookmarkIcon,
  HeartIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";

export default function CardActions({ post, currentUser }) {
  const userLiked = false;
  // const userLiked = post.like.user.some((user) => user.$id === currentUser.$id);
  const [liked, setLiked] = useState(userLiked);

  // useEffect(() => {
  //     likeAndUnlikePost(post.like.$id);
  // }, [liked, post.like.$id]);

  return (
    <div className="flex items-center justify-end text-slate-700">
      <button className="flex items-center p-1 mx-1 rounded-md hover:bg-slate-200">
        <ShareIcon className="size-5" />
      </button>
      <button className="flex items-center p-1 mx-1 rounded-md hover:bg-slate-200">
        <BookmarkIcon className="size-5" />
        <span className="ml-1 text-sm font-medium">12</span>
      </button>
      <button className="flex items-center p-1 mx-1 rounded-md hover:bg-slate-200">
        <ArrowPathRoundedSquareIcon className="size-5" />
        <span className="ml-1 text-sm font-medium">12</span>
      </button>
      <button
        className="flex items-center p-1 mx-1 rounded-md hover:bg-slate-200"
        onClick={() => setLiked((prev) => !prev)}
      >
        {liked ? (
          <SolidHeartIcon className="text-red-500 size-5" />
        ) : (
          <HeartIcon className="size-5" />
        )}
        <span className={`ml-1 font-medium text-sm ${liked && "text-red-500"}`}>
          {post.like.user.length}
        </span>
      </button>
    </div>
  );
}
