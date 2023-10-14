import { RiBookmarkLine } from "react-icons/ri";

interface IProps {
  className?: string;
}

export default function BookmarkIcon({ className }: IProps) {
  return <RiBookmarkLine className={className || "w-6 h-6"} />;
}
