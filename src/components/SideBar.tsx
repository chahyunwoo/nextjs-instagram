import { AuthUser } from "@/app/model/user";
import Avatar from "./Avatar";

interface IProps {
  user: AuthUser;
}

export default function SideBar({ user }: IProps) {
  const { name, username, image } = user;

  return (
    <>
      <div className="flex items-center">
        {image && <Avatar image={image} />}
        <div className="ml-4">
          <p className="font-bold">{username}</p>
          <p className="text-lg text-neutral-500 leading-5">{name}</p>
        </div>
      </div>
      <p className="text-sm text-neutral-500 mt-8">
        About ・ Help ・ Press ・ API ・ Jobs ・ Privacy ・ Terms ・ Location ・
        Language
      </p>
      <p className="font-bold mt-8 text-sm text-neutral-500">
        &copy; Copyright GRAM from Chahyunwoo
      </p>
    </>
  );
}
