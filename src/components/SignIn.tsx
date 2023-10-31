"use client";

import { providerIcons } from "@/data/providerIcons";
import { ClientSafeProvider, signIn } from "next-auth/react";
import SignInButton from "./atoms/SignInButton";

interface IProps {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
}

export default function SignIn({ providers, callbackUrl }: IProps) {
  return (
    <div className="flex flex-col w-[370px] mx-10 py-10 border border-neutral-100/30 rounded-sm justify-center items-center shadow-2xl">
      <h1 className="font-bold text-2xl mb-10 border-b pb-10 border-b-neutral-100/30">
        STARGRAM
      </h1>

      <ul className="w-full flex flex-col gap-2">
        {Object.values(providers).map((provider) => {
          const IconComponent = providerIcons[provider.name];

          return (
            <li key={provider.name} className="flex justify-center">
              <SignInButton
                provider={provider}
                signIn={signIn}
                callbackUrl={callbackUrl}
                icon={IconComponent}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
