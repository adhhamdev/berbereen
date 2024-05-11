import Image from "next/image";
import CardActions from "./card-actions";
import Link from "next/link";
import CardOptions from "./card-options";
import { getLoggedInUser } from "@/lib/server/appwrite";

export default async function PostCard({ post }) {
  const currentUser = await getLoggedInUser();
  return (
    <div className="w-full border-b-2 p1 border-slate-300 p-4 pb-2 space-y-3 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src={post.user.profilePicture}
            alt=""
            width={30}
            height={30}
            className="rounded-full"
          />
          <p className="ml-2 text-base font-semibold">{post.user.name}</p>
          <span className="mx-1">•</span>
          <span className="text-sm text-slate-500 font-medium">
            {post.user.email}
          </span>
        </div>
        <CardOptions />
      </div>
      <div>
        <p className="w-full text-sm text-black font-medium">{post.text}</p>
      </div>
      {post.image && (
        <div className="w-fit relative h-64">
          <Link href={`/image/${post.$id}`} scroll={false}>
            <Image
              src={post.image}
              alt=""
              width={300}
              height={300}
              className="rounded-lg object-cover h-full max-h-64 hover:brightness-75"
            />
          </Link>
        </div>
      )}
      <CardActions post={post} currentUser={currentUser} />
    </div>
  );
}
