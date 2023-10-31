"use client";

import SearchUserList from "../SearchUserList";
import SearchInput from "../SearchInput";
import useSearchUser from "@/hooks/useSearchUser";

export default function MobileHeaderSearchInput() {
  const {
    value,
    setValue,
    isFocused,
    setIsFocused,
    containerRef,
    filteredUsers,
    isLoading,
  } = useSearchUser();

  return (
    <SearchInput
      size="small"
      containerRef={containerRef}
      value={value}
      setValue={setValue}
      isFocused={isFocused}
      setIsFocused={setIsFocused}
    >
      {isFocused && filteredUsers && (
        <SearchUserList
          isLoading={isLoading}
          filteredUsers={filteredUsers}
          isDropDown
        />
      )}
    </SearchInput>
  );
}
