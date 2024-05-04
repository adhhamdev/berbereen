 
import PostList from "@/components/post-list";

export default function Home() {
  const listData = [
    {
      id: 0,
      title: "Title",
      content: "lorem ipsum dolor sit amet",
      image: "/profile.jpg",
      video: "",
      createdAt: new Intl.RelativeTimeFormat("en", { style: "short" }).format(
        -((new Date().getHours()) - 5),
        "hours"
      ),
      user: {
        name: "John Doe",
        avatar: "/profile.jpg",
      },
    },
    {
      id: 0,
      title: "Title",
      content: "lorem ipsum dolor sit amet",
      image: "/profile.jpg",
      video: "",
      createdAt: new Intl.RelativeTimeFormat("en", { style: "short" }).format(
        -((new Date().getHours()) - 5),
        "hours"
      ),
      user: {
        name: "John Doe",
        avatar: "/profile.jpg",
      },
    },
    {
      id: 0,
      title: "Title",
      content: "lorem ipsum dolor sit amet",
      image: "/profile.jpg",
      video: "",
      createdAt: new Intl.RelativeTimeFormat("en", { style: "short" }).format(
        -((new Date().getHours()) - 5),
        "hours"
      ),
      user: {
        name: "John Doe",
        avatar: "/profile.jpg",
      },
    },
    {
      id: 0,
      title: "Title",
      content: "lorem ipsum dolor sit amet",
      image: "/profile.jpg",
      video: "",
      createdAt: new Intl.RelativeTimeFormat("en", { style: "short" }).format(
        -((new Date().getHours()) - 5),
        "hours"
      ),
      user: {
        name: "John Doe",
        avatar: "/profile.jpg",
      },
    },
    {
      id: 0,
      title: "Title",
      content: "lorem ipsum dolor sit amet",
      image: "/profile.jpg",
      video: "",
      createdAt: new Intl.RelativeTimeFormat("en", { style: "short" }).format(
        -((new Date().getHours()) - 5),
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
      <PostList listData={listData} />
    </div>
  );
}
