import BackButton from "@/components/ui/BackButton";
import UserPosts from "@/components/UserPosts";
import UserProfile from "@/components/UserProfile";
import { getUserForProfile } from "@/service/user";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

interface IProps {
  params: { username: string };
}

const getUser = cache(async (username: string) => getUserForProfile(username));

export default async function Page({ params: { username } }: IProps) {
  const user = await getUserForProfile(username);

  if (!user) {
    notFound();
  }

  return (
    <>
      <div className="fixed md:hidden w-full bg-black h-16 border-b border-b-neutral-100/20 flex items-center justify-center font-semibold">
        <BackButton />
        <h2>{user.username}</h2>
      </div>
      <div className="pt-20 md:pt-0 md:mt-10 w-full max-w-screen-lg mx-auto px-4">
        <UserProfile user={user} />
        <UserPosts user={user} />
      </div>
    </>
  );
}

export async function generateMetadata({
  params: { username },
}: IProps): Promise<Metadata> {
  const user = await getUser(username);

  return {
    title: `${user?.name} (@${user?.username}) ・ Instantgram Photos`,
    description: `${user?.name}'s all Instantgram Posts`,
  };
}
