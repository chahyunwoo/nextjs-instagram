import reactDom from "react-dom";

interface IProps {
  children: React.ReactNode;
}

export default function ModalPortal({ children }: IProps) {
  if (typeof window === "undefined") {
    return null;
  }

  const node = document.getElementById("portal") as Element;

  return reactDom.createPortal(children, node);
}
