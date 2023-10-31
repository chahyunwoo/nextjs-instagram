import useOnClickOutside from "@/hooks/useOnclickOutSide";
import { useEffect, useRef } from "react";
import CloseIcon from "./atoms/icons/CloseIcon";

interface IProps {
  children: React.ReactNode;
  setOpenModal: (openModal: boolean) => void;
}

export default function PostModal({ setOpenModal, children }: IProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(modalRef, () => {
    setOpenModal(false);
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <section className="fixed top-0 left-0 w-full h-full bg-black/70 z-30 flex justify-center items-center">
      <button
        className="absolute top-5 right-5"
        onClick={() => setOpenModal(false)}
      >
        <CloseIcon />
      </button>
      <div className="h-auto w-3/4 bg-black" ref={modalRef}>
        {children}
      </div>
    </section>
  );
}
