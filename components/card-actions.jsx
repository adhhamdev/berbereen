import {
  ArrowPathRoundedSquareIcon,
  BookmarkIcon,
  HeartIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

export default function CardActions() {
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
      <button className="flex items-center p-1 mx-1 hover:bg-slate-200 rounded-md">
        <HeartIcon className="size-5" />
        <span className="ml-1 font-medium text-sm">12</span>
      </button>
    </div>
  );
}
