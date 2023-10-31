import UseMe from "@/hooks/useMe";
import usePosts from "@/hooks/usePosts";
import { Comment, SimplePost } from "@/model/posts";
import parseDate from "@/utils/date";
import BookmarkFillIcon from "./atoms/icons/BookmarkFillIcon";
import BookmarkIcon from "./atoms/icons/BookmarkIcon";
import HeartFillIcon from "./atoms/icons/HeartFillIcon";
import HeartIcon from "./atoms/icons/HeartIcon";
import CommentForm from "./CommentForm";
import ToggleButton from "./ui/ToggleButton";

interface IProps {
  post: SimplePost;
  onComment: (comment: Comment) => void;
  children?: React.ReactNode;
  isBorder?: boolean;
}

export default function ActionBar({
  post,
  children,
  onComment,
  isBorder = false,
}: IProps) {
  const { id, likes, createdAt } = post;
  const { user, setBookmark } = UseMe();
  const { setLike } = usePosts();

  const liked = user ? likes.includes(user.username) : false;
  const bookmarked = user?.bookmarks.includes(id) ?? false;

  const handleLike = (like: boolean) => {
    user && setLike(post, user.username, like);
  };

  const handleBookmark = (bookmark: boolean) => {
    user && setBookmark(id, bookmark);
  };

  const handlePostComment = (comment: string) => {
    user && onComment({ comment, username: user.username, image: user.image });
  };

  return (
    <>
      <div className="flex justify-between my-2">
        <ToggleButton
          toggled={liked}
          onToggle={handleLike}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
        />
        <ToggleButton
          toggled={bookmarked}
          onToggle={handleBookmark}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>
      <div className="py-1">
        <p className="text-sm font-semibold mb-2">
          {`${likes?.length ?? 0} ${likes?.length > 1 ? "likes" : "like"}`}
        </p>
        {children}
        <p className="text-xs text-neutral-100/30 uppercase mb-2">
          {parseDate(createdAt)}
        </p>
      </div>
      <CommentForm isBorder={isBorder} onPostComment={handlePostComment} />
    </>
  );
}
