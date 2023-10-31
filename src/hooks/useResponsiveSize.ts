import { useState, useEffect } from "react";
import { AvatarSize } from "@/components/atoms/Avatar";

export function useResponsiveSize(
  defaultSize: AvatarSize,
  responsiveSize: AvatarSize
): AvatarSize {
  const [size, setSize] = useState(defaultSize);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setSize(responsiveSize);
      } else {
        setSize(defaultSize);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [defaultSize, responsiveSize]);

  return size;
}
