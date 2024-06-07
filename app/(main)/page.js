import Popup from "@/components/popup";
import PostList from "@/components/post-list";

export default async function Page({ params, searchParams }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3">
      <div></div>
      <div>
        <PostList listData={[]} />
      </div>
      <div></div>
      <Popup params={params} searchParams={searchParams} />
    </div>
  );
}
