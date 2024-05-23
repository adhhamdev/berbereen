import { BookmarkIcon } from "@heroicons/react/24/solid";

export default function Page() {
  return (
    <div>
      <h1 className="flex items-center m-4 text-lg font-bold text-slate-700">
        <BookmarkIcon className="size-6 mr-1" /> Saved
      </h1>
      {/* <PostList listData={listData} /> */}
    </div>
  );
}
