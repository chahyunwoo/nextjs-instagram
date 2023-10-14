import Link from "next/link";
import Avatar from "./Avatar";

interface IProps {
  image: string;
  username: string;
}

export default function PostUserAvatar({ image, username }: IProps) {
  return (
    <div className="flex items-center p-2">
      <Avatar image={image} highlight size="medium" />
      <Link href={`/user/${username}`} passHref>
        <span className="text-gray-900 font-bold ml-2">{username}</span>
      </Link>
    </div>
  );
}
