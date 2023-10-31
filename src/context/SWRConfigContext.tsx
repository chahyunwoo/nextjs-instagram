"use client";

import { SWRConfig } from "swr";
import axios from "axios";

interface IProps {
  children: React.ReactNode;
}

export default function SWRConfigContext({ children }: IProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => axios.get(url).then((res) => res.data),
      }}
    >
      {children}
    </SWRConfig>
  );
}
