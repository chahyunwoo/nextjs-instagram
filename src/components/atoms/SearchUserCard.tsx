import { SearchUser } from "@/model/user";
import Link from "next/link";
import Avatar from "./Avatar";

interface IProps {
  user: SearchUser;
}

export default function SearchUserCard({ user }: IProps) {
  const { name, userImage, username } = user;

  return (
    <div>
      <Link
        href={`user/${username}`}
        className="w-full h-full flex items-center"
        scroll={false}
      >
        <Avatar image={userImage} size="small" />
        <div className="flex flex-col ml-4">
          <p className="text-sm">{name}</p>
          <p className="text-xs text-neutral-500">{username}</p>
        </div>
      </Link>
    </div>
  );
}
