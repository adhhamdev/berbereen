import PostList from "@/components/post-list";
import { getLoggedInUser, getPosts } from "@/lib/appwrite";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getLoggedInUser();
  if (!user) redirect("/login");
  const posts = await getPosts();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3">
      <div className="bg-slate-600"></div>
      <div>
        <PostList listData={posts} />
      </div>
      <div className="bg-slate-600"></div>
    </div>
  );
}
