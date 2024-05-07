import PostCard from "./post-card";

export default function PostList({listData}) {

    return (
        <div className="grid grid-cols-1 pb-14">
            {listData.map((post, index) => (
                <PostCard key={index} post={post} />
            ))}
        </div>
    );
}