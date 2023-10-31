import { SearchUser } from "@/model/user";
import { useRef, useState, useMemo } from "react";
import useSWR from "swr";
import UseDebounce from "./useDebounce";
import useOnClickOutside from "./useOnclickOutSide";

export default function useSearchUser() {
  const {
    data: users,
    isLoading,
    error,
  } = useSWR<SearchUser[]>("/api/getAllUsers", {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const debouncedSearchValue = UseDebounce(value);

  const randomUsers = useMemo(() => {
    if (!users) return [];
    return [...users].sort(() => 0.5 - Math.random()).slice(0, 15);
  }, [users]);

  const filteredUsers = useMemo(() => {
    if (debouncedSearchValue === "") {
      return randomUsers;
    }
    return (
      users
        ?.filter(
          (user) =>
            user.name.includes(debouncedSearchValue) ||
            user.username.includes(debouncedSearchValue)
        )
        .slice(0, 15) || []
    );
  }, [users, randomUsers, debouncedSearchValue]);

  useOnClickOutside(containerRef, () => {
    setIsFocused(false);
  });

  return {
    value,
    setValue,
    isFocused,
    setIsFocused,
    containerRef,
    filteredUsers,
    isLoading,
  };
}
