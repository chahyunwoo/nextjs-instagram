import { SimplePost } from "@/model/posts";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import PostDetail from "./PostDetail";
import PostModal from "./PostModal";
import ModalPortal from "./ui/ModalPortal";

interface IProps {
  post: SimplePost;
  priority: boolean;
}

export default function PostGridCard({ post, priority = false }: IProps) {
  const { image, username } = post;
  const { data: session } = useSession();

  const [openModal, setOpenModal] = useState(false);

  const handleClick = () => {
    if (!session?.user) {
      return signIn();
    }

    setOpenModal(true);
  };

  return (
    <div className="relative">
      <Image
        src={image}
        alt={`photo by ${username}`}
        className="object-cover w-full aspect-square"
        width={500}
        height={500}
        priority={priority}
        onClick={handleClick}
      />
      {openModal && (
        <ModalPortal>
          <PostModal setOpenModal={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </div>
  );
}
