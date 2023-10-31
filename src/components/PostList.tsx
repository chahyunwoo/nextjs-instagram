"use client";

import usePosts from "@/hooks/usePosts";
import { ClipLoader } from "react-spinners";
import PostListCard from "./PostListCard";

export default function PostList() {
  const { posts, isLoading, error } = usePosts();

  return (
    <section className="max-w-full md:max-w-lg mx-auto">
      {isLoading ? (
        <div className="text-center mt-48">
          <ClipLoader size={40} color="darkgray" />
        </div>
      ) : (
        (!posts || posts.length === 0) && <p>No Posts</p>
      )}
      {posts && posts.length > 1 && (
        <ul>
          {posts.map((post, index) => (
            <li key={post.id} className="mb-4">
              <PostListCard post={post} priority={index < 2} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
