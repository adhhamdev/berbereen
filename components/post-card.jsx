import Image from "next/image";
import CardActions from "./card-actions";
import Link from "next/link";

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
        <p className="ml-2 text-base font-semibold">{post.user.name}</p>
        <span className="mx-1">•</span>
        <span className="text-sm text-slate-500 font-medium">
          {post.createdAt}
        </span>
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
      {post.image && (
        <div className="w-full relative h-64">
          <Link href={`/image/${post.id}`} scroll={false}>
            <Image
              src={post.image}
              alt=""
              width={300}
              height={300}
              className="rounded-lg object-cover h-full max-h- max-h-64 hover:brightness-75"
            />
          </Link>
        </div>
      )}
      <CardActions />
    </div>
  );
}
