import PostList from "@/components/post-list";
import { BookmarkIcon } from "@heroicons/react/24/solid";

export default function Page() {
    const listData = [
        {
          id: 0,
          title: "Title",
          content: "lorem ipsum dolor sit amet",
          image: "/profile.jpg",
          video: "",
          createdAt: new Intl.RelativeTimeFormat("en", { style: "short" }).format(
            -(new Date().getHours() - 5),
            "hours"
          ),
          user: {
            name: "John Doe",
            avatar: "/profile.jpg",
          },
        },
        {
          id: 2,
          title: "Title",
          content: "lorem ipsum dolor sit amet",
          image: "/profile.jpg",
          video: "",
          createdAt: new Intl.RelativeTimeFormat("en", { style: "short" }).format(
            -(new Date().getHours() - 5),
            "hours"
          ),
          user: {
            name: "John Doe",
            avatar: "/profile.jpg",
          },
        },
        {
          id: 4,
          title: "Title",
          content: "lorem ipsum dolor sit amet",
          image: "/profile.jpg",
          video: "",
          createdAt: new Intl.RelativeTimeFormat("en", { style: "short" }).format(
            -(new Date().getHours() - 5),
            "hours"
          ),
          user: {
            name: "John Doe",
            avatar: "/profile.jpg",
          },
        },
        {
          id: 8,
          title: "Title",
          content: "lorem ipsum dolor sit amet",
          image: "/profile.jpg",
          video: "",
          createdAt: new Intl.RelativeTimeFormat("en", { style: "short" }).format(
            -(new Date().getHours() - 5),
            "hours"
          ),
          user: {
            name: "John Doe",
            avatar: "/profile.jpg",
          },
        },
        {
          id: 3,
          title: "Title",
          content: "lorem ipsum dolor sit amet",
          image: "/profile.jpg",
          video: "",
          createdAt: new Intl.RelativeTimeFormat("en", { style: "short" }).format(
            -(new Date().getHours() - 5),
            "hours"
          ),
          user: {
            name: "John Doe",
            avatar: "/profile.jpg",
          },
        },
      ];
    return (
        <div>
            <h1 className="flex items-center my-3 mx-4 text-xl font-bold text-slate-700"><BookmarkIcon className="size-7" /> Saved</h1>
            <PostList listData={listData} />
        </div>
    );
}