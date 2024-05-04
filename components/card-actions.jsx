import {
  ArrowPathRoundedSquareIcon,
  BookmarkIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

export default function CardActions() {
  return (
    <div className="flex items-center justify-end text-slate-700">
      <button className="flex items-center w-14">
        <BookmarkIcon className="size-5" />
        <span className="ml-1 font-medium text-sm">12</span>
      </button>
      <button className="flex items-center w-14">
        <ArrowPathRoundedSquareIcon className="size-5" />
        <span className="ml-1 font-medium text-sm">12</span>
      </button>
      <button className="flex items-center w-14">
        <HeartIcon className="size-5" />
        <span className="ml-1 font-medium text-sm">12</span>
      </button>
    </div>
  );
}
