import Link from "next/link";
import Avatar from "./atoms/Avatar";

interface IProps {
  image: string;
  username: string;
  size?: "small" | "default";
}

export default function PostUserAvatar({
  image,
  username,
  size = "default",
}: IProps) {
  return (
    <div className={`flex items-center ${size === "default" ? "py-4" : ""}`}>
      <Avatar
        image={image}
        size={size === "default" ? "medium" : "small"}
        highlight={size === "default"}
      />
      <Link href={`/user/${username}`} passHref scroll={false}>
        <span
          className={`font-semibold ml-2 ${
            size === "default"
              ? "text-md"
              : "text-xs absolute -translate-y-[0.5rem]"
          }`}
        >
          {username}
        </span>
      </Link>
    </div>
  );
}
