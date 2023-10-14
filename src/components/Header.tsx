"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navlinks } from "@/data/navlinks";
import ColorButton from "./ui/ColorButton";
import { useSession, signIn, signOut } from "next-auth/react";
import Avatar from "./Avatar";

export default function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const user = session?.user;

  return (
    <header className="sticky top-0 bg-white border-b z-10">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center px-6">
          <Link href="/">
            <h1 className="text-2xl font-bold">INSTANTGRAM</h1>
          </Link>
          <nav>
            <ul className="flex gap-4 items-center p-4">
              {navlinks.map((navlink) => (
                <li key={navlink.name}>
                  <Link href={navlink.href}>
                    {pathname === navlink.href
                      ? navlink.active()
                      : navlink.defaultIcon()}
                  </Link>
                </li>
              ))}
              {user && (
                <li>
                  <Link href={`/user/${user.username}`}>
                    <Avatar image={user.image} size="small" highlight />
                  </Link>
                </li>
              )}
              <li>
                {session ? (
                  <ColorButton text="Sign Out" onClick={() => signOut()} />
                ) : (
                  <ColorButton text="Sign In" onClick={() => signIn()} />
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
