import { AiOutlineHeart } from "react-icons/ai";

interface IProps {
  className?: string;
}

export default function HeartIcon({ className }: IProps) {
  return <AiOutlineHeart className={className || "w-7 h-7"} />;
}
