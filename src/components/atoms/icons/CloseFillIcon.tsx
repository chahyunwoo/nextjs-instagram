import { AiFillCloseCircle } from "react-icons/ai";

interface IProps {
  onClick: () => void;
}

export default function CloseFillIcon({ onClick }: IProps) {
  return (
    <AiFillCloseCircle className="w-5 h-5 cursor-pointer" onClick={onClick} />
  );
}
