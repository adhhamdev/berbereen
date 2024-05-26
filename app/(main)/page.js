import PostList from "@/components/post-list";
import { getLoggedInUser } from "@/lib/server/appwrite";

export default async function Page() {
  console.log("on the home", await getLoggedInUser())
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3">
      <div></div>
      <div>
        <PostList listData={[]} />
      </div>
      <div></div>
    </div>
  );
}
