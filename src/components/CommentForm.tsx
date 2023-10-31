import { FormEvent, useState } from "react";
import SmileIcon from "./atoms/icons/SmileIcon";

interface IProps {
  isBorder?: boolean;
  onPostComment: (comment: string) => void;
}

export default function CommentForm({
  isBorder = false,
  onPostComment,
}: IProps) {
  const [comment, setComment] = useState("");
  const buttonDisabled = comment.length === 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onPostComment(comment);

    setComment("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center ${
        isBorder ? "border-t border-t-neutral-100/20" : ""
      }`}
    >
      <SmileIcon />
      <input
        className="w-full ml-2 border-none outline-none bg-transparent py-4 px-3"
        type="text"
        placeholder="댓글 달기..."
        required
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        disabled={buttonDisabled}
        className={`${
          buttonDisabled ? "text-neutral-500" : "text-neutral-100"
        }`}
      >
        POST
      </button>
    </form>
  );
}
