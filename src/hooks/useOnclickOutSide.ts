import { MutableRefObject, useEffect } from "react";

function useOnClickOutside<T extends HTMLElement>(
  ref: MutableRefObject<T | null>,
  handler: (event: MouseEvent) => void
) {
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref, handler]);
}

export default useOnClickOutside;
