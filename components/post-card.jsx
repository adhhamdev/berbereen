import Image from "next/image";
import {
  ArrowPathRoundedSquareIcon,
  BookmarkIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

export default function PostCard({ post }) {
  return (
    <div className="w-full border-b-2 p1 border-slate-300 p-4 space-y-3">
      <div className="flex items-center">
        <Image
          src={post.user.avatar}
          alt=""
          width={30}
          height={30}
          className="rounded-full"
        />
        <p className="ml-2 text-sm font-semibold">{post.user.name}</p>
        <span className="mx-1">•</span>
        <span className="text-sm text-slate-500 font-medium">{post.createdAt}</span>
      </div>
      <div>
        <p className="w-full text-sm text-black font-medium">
          Blushing delicate endured existence exercise so ye as. Blushes up
          object highly pitched in lasting to window. Throwing and mastered
          jennings amounted admitting. Outweigh it families distance wandered ye
          an. Contrasted enthusiastic yet unpleasant solicitude. Dissimilar
          admiration no decisively boisterous as.
        </p>
      </div>
      <div className="flex items-center justify-end gap-5">
        <button className="flex items-center">
          <BookmarkIcon className="size-5 text-slate-900" />
          <span className="ml-1 text-slate-900">12</span>
        </button>
        <button className="flex items-center">
          <ArrowPathRoundedSquareIcon className="size-5 text-slate-900" />
          <span className="ml-1 text-slate-900">12</span>
        </button>
        <button className="flex items-center">
          <HeartIcon className="size-5 text-slate-900" />
          <span className="ml-1 text-slate-900">12</span>
        </button>
      </div>
    </div>
  );
}
