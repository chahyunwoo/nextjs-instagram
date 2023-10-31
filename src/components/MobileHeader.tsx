"use client";

import { useSession } from "next-auth/react";
import StargramIcon from "./atoms/icons/StargramIcon";
import MobileHeaderSearchInput from "./ui/MobileHeaderSearchInput";

export default function MobileHeader() {
  const { data: session } = useSession();

  const user = session?.user;

  return (
    <>
      {user && (
        <section className="fixed top-0 left-0 w-full h-16 border-b border-b-neutral-100/20 md:hidden bg-black z-10 px-4">
          <div className="w-full h-full flex items-center justify-between">
            <StargramIcon />
            <MobileHeaderSearchInput />
          </div>
        </section>
      )}
    </>
  );
}
