import PostList from "@/components/post-list";
import { getLoggedInUser } from "@/lib/appwrite";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getLoggedInUser();
  if (!user) redirect("/signup");
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3">
      <div className="bg-slate-600"></div>
      <div>
        <PostList listData={[]} />
      </div>
      <div className="bg-slate-600"></div>
    </div>
  );
}
