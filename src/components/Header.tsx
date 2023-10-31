"use client";

import { navlinks } from "@/data/navlinks";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Avatar from "./atoms/Avatar";
import LoginButton from "./atoms/icons/LoginButton";
import LogoutButton from "./atoms/icons/LogoutButton";
import SearchIcon from "./atoms/icons/SearchIcon";
import Stargram from "./atoms/icons/StargramIcon";
import SearchUserSideBar from "./SearchUserSideBar";

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const [isToggled, setIsToggled] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleToggle = useCallback(() => {
    setIsToggled((prev) => !prev);
  }, []);

  const user = session?.user;

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsToggled(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <header
      className="fixed bottom-0 left-0 w-full h-16 md:w-16 md:h-screen md:top-0 border-t border-t-neutral-100/20 md:border-t-0 z-20"
      ref={containerRef}
    >
      <div className="absolute z-10 h-full w-full flex items-center md:flex-col md:py-10 md:justify-start bg-black md:border-r md:border-r-neutral-100/20 ">
        <Link
          href="/"
          className="hidden md:block mb-0 md:mb-20 z-10"
          scroll={false}
        >
          <Stargram />
        </Link>

        <nav className="flex-1 md:flex-grow">
          <ul className="flex justify-around md:flex-col md:gap-8 items-center">
            {navlinks.map(({ name, href, defaultIcon, active }) => (
              <li key={name} className="md:mb-2">
                <Link href={href} scroll={false}>
                  {pathname === href ? active() : defaultIcon()}
                </Link>
              </li>
            ))}
            {user && (
              <li className="md:mb-2 hidden md:block">
                <button onClick={handleToggle}>
                  <SearchIcon />
                </button>
              </li>
            )}
          </ul>
        </nav>

        <ul className="flex-1 md:flex-none flex justify-around md:justify-stretch md:flex-col md:gap-8 items-center">
          {user ? (
            <li className="md:mb-2">
              <Link href={`/user/${user.username}`} scroll={false}>
                <Avatar highlight size="small" image={user.image} />
              </Link>
            </li>
          ) : (
            <li />
          )}
          <li className="md:mb-2">
            {session ? (
              <button
                onClick={() => signOut()}
                className="flex justify-center items-center"
              >
                <LogoutButton />
              </button>
            ) : (
              <button
                onClick={() => signIn()}
                className="flex justify-center items-center"
              >
                <LoginButton />
              </button>
            )}
          </li>
        </ul>
      </div>
      <SearchUserSideBar isToggled={isToggled} setIsToggled={handleToggle} />
    </header>
  );
}
