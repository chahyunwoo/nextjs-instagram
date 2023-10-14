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
  const user = await getUser(username);

  if (!user) {
    notFound();
  }

  return (
    <section className="w-full">
      <UserProfile user={user} />
      <UserPosts user={user} />
    </section>
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