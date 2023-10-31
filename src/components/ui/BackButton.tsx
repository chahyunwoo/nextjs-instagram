"use client";

import { useRouter } from "next/navigation";
import BackIcon from "../atoms/icons/BackIcon";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="absolute top-1/2 left-5 -translate-y-1/2"
    >
      <BackIcon />
    </button>
  );
}
