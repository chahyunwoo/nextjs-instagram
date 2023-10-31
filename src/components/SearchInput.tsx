import CloseFillIcon from "./atoms/icons/CloseFillIcon";
import SearchIcon from "./atoms/icons/SearchIcon";

interface IProps {
  size: "small" | "full";
  value: string;
  setValue: (value: string) => void;
  isFocused: boolean;
  setIsFocused: (isFocused: boolean) => void;
  containerRef: React.RefObject<HTMLDivElement>;
  children?: React.ReactNode;
}

export default function SearchInput({
  size,
  containerRef,
  children,
  value,
  setValue,
  isFocused,
  setIsFocused,
}: IProps) {
  return (
    <div className="relative" ref={containerRef}>
      <input
        type="text"
        className={`bg-neutral-900 rounded-lg px-4 py-2 outline-none focus:placeholder:opacity-0 focus:placeholder:invisible ${
          size === "small" ? "w-[300px]" : "w-full"
        }`}
        placeholder="검색"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
      />
      <div className="absolute top-1/2 right-4 -translate-y-1/2">
        {isFocused ? (
          <CloseFillIcon onClick={() => setIsFocused(false)} />
        ) : (
          <SearchIcon />
        )}
      </div>
      {children}
    </div>
  );
}
