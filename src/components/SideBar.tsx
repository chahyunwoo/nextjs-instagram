import { AuthUser } from "@/model/user";
import Avatar from "./atoms/Avatar";

interface IProps {
  user: AuthUser;
}

export default function SideBar({ user }: IProps) {
  const { name, image, username } = user;

  return (
    <article className="hidden lg:block p-4 lg">
      <div className="flex items-center justify-center">
        {image && <Avatar size="large" image={image} />}
        <div className="ml-4">
          <p className="text-sm font-semibold">{username}</p>
          <p className="text-md text-neutral-400 leading-6">{name}</p>
        </div>
      </div>
      <p className="text-xs mt-8 text-neutral-700 text-center">
        &copy; 2023. Cha Hyun Woo.
        <br />
        All rights reserved.
      </p>
    </article>
  );
}
