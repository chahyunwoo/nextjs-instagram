interface IProps {
  text: string;
  onClick: () => void;
}

export default function ColorButton({ text, onClick }: IProps) {
  return (
    <div className="rounded-md bg-gradient-to-bl from-slate-800 via-slate-400 to-slate-800 p-[0.15rem]">
      <button
        className="bg-neutral-900 rounded-sm text-base p-[0.3rem] hover:opacity-90 transition-opacity duration-200"
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}
