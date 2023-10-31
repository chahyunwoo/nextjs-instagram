import usePosts from "@/hooks/usePosts";
import { ClipLoader } from "react-spinners";
import PostGridCard from "./PostGridCard";

export default function PostGrid() {
  const { posts, isLoading } = usePosts();

  return (
    <div className="w-full text-center">
      {isLoading && (
        <div className="text-center py-20">
          <ClipLoader size={40} color="darkgray" />
        </div>
      )}
      <ul className="grid grid-cols-3 gap-2 py-4">
        {posts &&
          posts.map((post, index) => (
            <li key={index}>
              <PostGridCard post={post} priority={index < 6} />
            </li>
          ))}
      </ul>
    </div>
  );
}
