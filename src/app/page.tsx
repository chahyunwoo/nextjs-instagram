import FollowingBar from "@/components/FollowingBar";
import MobileHeader from "@/components/MobileHeader";
import PostList from "@/components/PostList";
import SideBar from "@/components/SideBar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect("auth/signin");
  }

  return (
    <>
      <MobileHeader />
      <section className="w-full flex flex-col lg:flex-row max-w-screen-lg py-16 md:py-4 px-4 mx-auto gap-10">
        <div className="w-full basis-3/4 min-w-0">
          <FollowingBar />
          <PostList />
        </div>
        <div className="basis-1/4">
          <SideBar user={user} />
        </div>
      </section>
    </>
  );
}
