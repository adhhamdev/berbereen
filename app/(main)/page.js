import PostList from "@/components/post-list";

export const metadata = {
  title: "Berbereen",
  description: "The platform of Berbereenians",
};

export default async function Page() {
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
