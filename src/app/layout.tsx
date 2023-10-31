import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import Header from "@/components/Header";
import AuthContext from "@/context/AuthContext";
import SWRConfigContext from "@/context/SWRConfigContext";

const sans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Stargram",
    template: "Stargram | %s",
  },
  description: "Stargram Photos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${sans.className} bg-black text-neutral-100`}>
        <AuthContext>
          <SWRConfigContext>
            <Header />
            <main className="w-full h-full md:pl-16">{children}</main>
          </SWRConfigContext>
        </AuthContext>

        <div id="portal" />
      </body>
    </html>
  );
}
