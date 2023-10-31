"use client";

import usePosts from "@/hooks/usePosts";
import { Comment, SimplePost } from "@/model/posts";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ActionBar from "./ActionBar";
import PostDetail from "./PostDetail";
import PostModal from "./PostModal";
import PostUserAvatar from "./PostUserAvatar";
import ModalPortal from "./ui/ModalPortal";

interface IProps {
  post: SimplePost;
  priority?: boolean;
}

export default function PostListCard({ post, priority = false }: IProps) {
  const { userImage, username, image, comments, text } = post;
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const { postComment } = usePosts();

  const handlePostComment = (comment: Comment) => {
    postComment(post, comment);
  };

  return (
    <article className="border-b border-neutral-100/10">
      <PostUserAvatar image={userImage} username={username} />
      <Image
        className="w-full object-cover aspect-square"
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
        priority={priority}
      />
      <ActionBar post={post} onComment={handlePostComment}>
        <p className="mb-2">
          <span
            className="font-semibold mr-1 cursor-pointer"
            onClick={() => router.push(`/user/${username}`, { scroll: false })}
          >
            {username}
          </span>
          {text}
        </p>
        {post.comments > 1 && (
          <button
            className="text-neutral-500 mb-2"
            onClick={() => setOpenModal(true)}
          >{`View all ${comments} comments`}</button>
        )}
      </ActionBar>
      {openModal && (
        <ModalPortal>
          <PostModal setOpenModal={setOpenModal}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </article>
  );
}
