"use client";

import { useResponsiveSize } from "@/hooks/useResponsiveSize";
import { ProfileUser } from "@/model/user";
import Avatar from "./atoms/Avatar";
import FollowButton from "./ui/FollowButton";

interface IProps {
  user: ProfileUser;
}

export default function UserProfile({ user }: IProps) {
  const { username, name, image, following, followers, posts } = user;
  const avatarSize = useResponsiveSize("xlarge", "largeplus");

  const info = [
    { title: "게시물", data: posts },
    { title: "팔로워", data: followers },
    { title: "팔로잉", data: following },
  ];

  return (
    <section className="w-full flex flex-col items-center">
      <div className="flex gap-6 items-center mb-6">
        <Avatar image={image} size={avatarSize} highlight />
        <div>
          <p className="font-semibold mb-2 text-lg">{username}</p>
          <ul className="flex text-sm md:text-md gap-4 md:gap-6 mb-2">
            {info.map(({ title, data }, index) => (
              <li key={index}>
                {title} <span className="font-semibold">{data}</span>
              </li>
            ))}
          </ul>
          <span className="text-neutral-400 text-sm md:text-md">{name}</span>
        </div>
      </div>
      <FollowButton user={user} />
    </section>
  );
}
