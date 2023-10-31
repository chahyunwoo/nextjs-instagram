import {
  ClientSafeProvider,
  SignInOptions,
  SignInResponse,
} from "next-auth/react";

interface IProps {
  provider: ClientSafeProvider;
  signIn: (
    id: string,
    options: SignInOptions
  ) => Promise<SignInResponse | undefined>;
  callbackUrl: string;
  icon: () => React.ReactElement;
}

export default function SignInButton({
  provider,
  signIn,
  callbackUrl,
  icon,
}: IProps) {
  return (
    <button
      onClick={() => signIn(provider.id, { callbackUrl })}
      className="block w-4/5 border border-neutral-100/30 bg-neutral-800 py-3 rounded-sm hover:bg-neutral-950 transition-color duration-300"
    >
      <div className="flex h-full items-center justify-center">
        <div className="mr-4">{icon()}</div>
        <p className="text-md">Sign in with {provider.name}</p>
      </div>
    </button>
  );
}
