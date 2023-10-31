"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import SearchInput from "./SearchInput";
import SearchUserList from "./SearchUserList";
import useSearchUser from "@/hooks/useSearchUser";

interface IProps {
  isToggled: boolean;
  setIsToggled: (toggle: boolean) => void;
}

export default function SearchUserSideBar({ isToggled, setIsToggled }: IProps) {
  const pathname = usePathname();
  const {
    value,
    setValue,
    isFocused,
    setIsFocused,
    containerRef,
    filteredUsers,
    isLoading,
  } = useSearchUser();

  useEffect(() => {
    if (isToggled) {
      setIsToggled(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <AnimatePresence>
      {isToggled && (
        <motion.div
          className="absolute hidden md:block w-96 top-0 left-16 h-full border-r rounded-e-xl rounded-t-xl bg-black border-r-neutral-100/30 z-0"
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "-100%" }}
          transition={{ type: "linear" }}
        >
          <div className="w-full break-words py-8 px-4">
            <h2 className="text-xl font-bold mb-4">검색</h2>
            <SearchInput
              size="full"
              value={value}
              setValue={setValue}
              isFocused={isFocused}
              setIsFocused={setIsFocused}
              containerRef={containerRef}
            />

            <div className="w-full h-full border-t border-t-neutral-100/20 mt-10 pt-10">
              {filteredUsers && (
                <SearchUserList
                  isLoading={isLoading}
                  filteredUsers={filteredUsers}
                />
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
