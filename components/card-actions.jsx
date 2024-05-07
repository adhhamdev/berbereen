"use client"
import { useEffect, useState } from "react"

import {
  ArrowPathRoundedSquareIcon,
  BookmarkIcon,
  HeartIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import {
  ArrowPathRoundedSquareIcon as SolidArrowPathRoundedSquareIcon,
  BookmarkIcon as SolidBookmarkIcon,
  HeartIcon as SolidHeartIcon,
} from "@heroicons/react/24/solid";
import { likeAndUnlikePost } from "@/lib/actions";

export default function CardActions({post, currentUser}) {
  console.log(post.like.user)
  const userLiked = post.like.user.some((user) => user.$id === currentUser.$id);
  const [liked, setLiked] = useState(userLiked);

  useEffect(() => {
      likeAndUnlikePost(post.like.$id);
  }, [liked, post.like.$id]);

  return (
    <div className="flex items-center justify-end text-slate-700">
      <button className="flex items-center p-1 mx-1 hover:bg-slate-200 rounded-md">
        <ShareIcon className="size-5" />
      </button>
      <button className="flex items-center p-1 mx-1 hover:bg-slate-200 rounded-md">
        <BookmarkIcon className="size-5" />
        <span className="ml-1 font-medium text-sm">12</span>
      </button>
      <button className="flex items-center p-1 mx-1 hover:bg-slate-200 rounded-md">
        <ArrowPathRoundedSquareIcon className="size-5" />
        <span className="ml-1 font-medium text-sm">12</span>
      </button>
      <button className="flex items-center p-1 mx-1 hover:bg-slate-200 rounded-md" onClick={() => setLiked(prev => !prev)}>
        {liked ? (
          <SolidHeartIcon className="size-5 text-red-500" />
        ) : (
          <HeartIcon className="size-5" />
        )}
        <span className={`ml-1 font-medium text-sm ${liked && 'text-red-500'}`}>{post.like.user.length}</span>
      </button>
    </div>
  );
}
