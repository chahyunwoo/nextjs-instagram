"use client";

import useMe from "@/hooks/useMe";
import { ProfileUser } from "@/model/user";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { BeatLoader } from "react-spinners";
import Button from "../atoms/Button";

interface IProps {
  user: ProfileUser;
}

export default function FollowButton({ user }: IProps) {
  const { username } = user;
  const { user: loggedInUser, toggleFollow } = useMe();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isUpdating = isPending || isFetching;

  const showButton = loggedInUser && loggedInUser.username !== username;
  const isFollowing =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === username);

  const text = isFollowing ? "팔로우 취소" : "팔로우";

  const handleFollow = async () => {
    setIsFetching(true);
    await toggleFollow(user.id, !isFollowing);
    setIsFetching(false);
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <>
      {showButton ? (
        <div className="relative w-full rounded-md overflow-hidden">
          {isUpdating && (
            <div className="absolute inset-0 flex gap-2 justify-center items-center z-10">
              <BeatLoader size={8} color="white" />
            </div>
          )}
          <Button
            text={text}
            onClick={handleFollow}
            gray={text === "팔로우 취소"}
            disabled={isUpdating}
          />
        </div>
      ) : (
        <button
          disabled
          className="w-full bg-neutral-900 rounded-md py-2 text-neutral-600"
        >
          현재 사용자의 프로필입니다.
        </button>
      )}
    </>
  );
}
