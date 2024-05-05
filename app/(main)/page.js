import PostList from "@/components/post-list";
import { getLoggedInUser } from "@/lib/appwrite";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getLoggedInUser();

  if (!user) redirect("/l");
  const listData = [
    {
      id: 0,
      title: "Title",
      content: "lorem ipsum dolor sit amet",
      image: "",
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
    <div className="grid grid-cols-1 sm:grid-cols-3">
      <div className="bg-slate-600"></div>
      <div>
        <PostList listData={listData} />
      </div>
      <div className="bg-slate-600"></div>
    </div>
  );
}
