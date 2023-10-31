interface IProps {
  text: string;
  onClick: () => void;
  gray?: boolean;
  disabled?: boolean;
}

export default function Button({
  text,
  onClick,
  gray,
  disabled = false,
}: IProps) {
  return (
    <button
      className={`w-full py-2 rounded-md ${
        gray ? "bg-neutral-600" : "bg-sky-400"
      } ${disabled && "opacity-20"} `}
      onClick={() => onClick()}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
