import { HomeUser, SimpleUser } from "@/model/user";
import useSWR from "swr";
import axios from "axios";
import { useCallback } from "react";

async function updateBookmark(postId: string, bookmark: boolean) {
  const response = await axios.put("/api/bookmarks", { id: postId, bookmark });
  return response.data;
}

async function updateFollow(targetId: string, follow: boolean) {
  const response = await axios.put("/api/follow", { id: targetId, follow });
  return response.data;
}

export default function useMe() {
  const { data: user, isLoading, error, mutate } = useSWR<HomeUser>("/api/me");

  const setBookmark = useCallback(
    (postId: string, bookmark: boolean) => {
      if (!user) return;

      const bookmarks = user.bookmarks ?? [];
      const newUser = {
        ...user,
        bookmarks: bookmark
          ? [...bookmarks, postId]
          : bookmarks.filter((b) => b !== postId),
      };

      return mutate(updateBookmark(postId, bookmark), {
        optimisticData: newUser,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [user, mutate]
  );

  const toggleFollow = useCallback(
    (targetId: string, follow: boolean) => {
      return mutate(updateFollow(targetId, follow), { populateCache: false });
    },
    [mutate]
  );

  return { user, isLoading, error, setBookmark, toggleFollow };
}
