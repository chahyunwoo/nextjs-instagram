import useFullPost from "@/hooks/useFullPost";
import { SimplePost } from "@/model/posts";
import Image from "next/image";
import Link from "next/link";
import { ClipLoader } from "react-spinners";
import ActionBar from "./ActionBar";
import Avatar from "./atoms/Avatar";
import PostUserAvatar from "./PostUserAvatar";

interface IProps {
  post: SimplePost;
}

export default function PostDetail({ post }: IProps) {
  const { id, username, userImage, image } = post;
  const { post: data, isLoading, postComment } = useFullPost(id);
  const comments = data?.comments;

  return (
    <section className="flex w-full h-full flex-col md:flex-row">
      <div className="relative basis-3/5">
        <Image
          src={image}
          alt={`photo by ${username}`}
          className="object-cover w-full aspect-square"
          width={500}
          height={500}
          priority
        />
      </div>
      <div className="w-full basis-2/5 flex flex-col">
        <div className="p-2 border-b border-b-neutral-100/20">
          <PostUserAvatar image={userImage} username={username} size="small" />
        </div>
        <div className="p-2 border-b border-b-neutral-100/20 flex-grow max-h-[100px] md:max-h-[320px] overflow-y-auto scroll-custom">
          {isLoading && (
            <div className="w-full min-h-[80px] md:h-full flex justify-center items-center">
              <ClipLoader size={20} color="darkgray" />
            </div>
          )}
          {comments && (
            <ul className="h-full">
              {comments.map(({ username, image, comment }, index) => (
                <li
                  key={index}
                  className="mb-2 last-of-type:mb-0 border-b border-b-neutral-100/10 last-of-type:border-none"
                >
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <Avatar image={image} size="small" />
                      <Link
                        href={`/user/${username}`}
                        className="ml-4 text-sm font-semibold min-w-[120px]"
                        scroll={false}
                      >
                        {username}
                      </Link>
                    </div>
                    <span className="my-2 ml-2 text-sm">{comment}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="px-2 pt-2">
          <ActionBar post={post} isBorder onComment={postComment} />
        </div>
      </div>
    </section>
  );
}
