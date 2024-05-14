import PostList from "@/components/post-list";
import { getLoggedInUser } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";
import { createUserEvent } from "../api/webhooks/user/route";

export default async function Page() {
  // await createUserEvent()
  const user = await getLoggedInUser();
  if (!user) redirect("/signup");
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
