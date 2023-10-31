import { SimplePost, Comment } from "@/model/posts";
import useSWR from "swr";
import axios from "axios";
import { useCallback } from "react";
import { useCacheKeys } from "@/context/CacheKeysContext";

async function updateLike(id: string, like: boolean) {
  const response = await axios.put("/api/likes", { id, like });
  return response.data;
}

async function addComment(id: string, comment: string) {
  const response = await axios.post("/api/comments", { id, comment });
  return response.data;
}

export default function usePosts() {
  const cacheKeys = useCacheKeys();

  const {
    data: posts,
    isLoading,
    error,
    mutate,
  } = useSWR<SimplePost[]>(cacheKeys.postsKey);

  const setLike = useCallback(
    (post: SimplePost, username: string, like: boolean) => {
      const newPost = {
        ...post,
        likes: like
          ? [...post.likes, username]
          : post.likes.filter((item) => item !== username),
      };

      const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

      return mutate(updateLike(post.id, like), {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [mutate, posts]
  );

  const postComment = useCallback(
    (post: SimplePost, comment: Comment) => {
      const newPost = {
        ...post,
        comments: post.comments + 1,
      };
      const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

      return mutate(addComment(post.id, comment.comment), {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [posts, mutate]
  );

  return { posts, isLoading, error, setLike, postComment };
}
