import { BookmarkIcon } from "@heroicons/react/24/solid";
import { getLoggedInUser } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getLoggedInUser();
  if (!user) redirect("/signup");
  return (
    <div>
      <h1 className="flex items-center m-4 text-lg font-bold text-slate-700">
        <BookmarkIcon className="size-6 mr-1" /> Saved
      </h1>
      {/* <PostList listData={listData} /> */}
    </div>
  );
}
