"use client";

import { SWRConfig } from "swr";

interface IProps {
  children: React.ReactNode;
}

export default function SWRConfigContext({ children }: IProps) {
  return (
    <SWRConfig
      value={{ fetcher: (url: string) => fetch(url).then((res) => res.json()) }}
    >
      {children}
    </SWRConfig>
  );
}
