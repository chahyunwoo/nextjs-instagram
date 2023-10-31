"use client";

import { CacheKeysContext } from "@/context/CacheKeysContext";
import { ProfileUser } from "@/model/user";
import { useState } from "react";
import BookmarkIcon from "./atoms/icons/BookmarkIcon";
import HeartIcon from "./atoms/icons/HeartIcon";
import PostIcon from "./atoms/icons/PostIcon";
import PostGrid from "./PostGrid";

interface IProps {
  user: ProfileUser;
}

const tabs = [
  { type: "posts", icon: <PostIcon /> },
  { type: "liked", icon: <HeartIcon className="w-3 h-3" /> },
  { type: "saved", icon: <BookmarkIcon className="w-3 h-3" /> },
];

export default function UserPosts({ user: { username } }: IProps) {
  const [query, setQuery] = useState(tabs[0].type);

  return (
    <section className="mt-10">
      <ul className="flex justify-center uppercase border-b text-neutral-400 border-b-neutral-100/20">
        {tabs.map(({ type, icon }) => (
          <li
            key={type}
            onClick={() => setQuery(type)}
            className={`p-4 cursor-pointer w-full flex justify-center ${
              type === query && "border-b font-semibold text-neutral-100"
            }`}
          >
            <button className="scale-150 md:scale-100">{icon}</button>
            <span className="hidden md:inline ml-2">{type}</span>
          </li>
        ))}
      </ul>
      <CacheKeysContext.Provider
        value={{ postsKey: `/api/users/${username}/${query}` }}
      >
        <PostGrid />
      </CacheKeysContext.Provider>
    </section>
  );
}
