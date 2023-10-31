import { SearchUser } from "@/model/user";
import { ClipLoader } from "react-spinners";
import SearchUserCard from "./atoms/SearchUserCard";

interface IProps {
  isLoading: boolean;
  filteredUsers: SearchUser[];
  isDropDown?: boolean;
}

export default function SearchUserList({
  isLoading,
  filteredUsers,
  isDropDown = false,
}: IProps) {
  return (
    <div className={`${ContainerStyles(isDropDown)}`}>
      {isLoading && (
        <div className="text-center py-4">
          <ClipLoader size={20} color="darkgray" />
        </div>
      )}
      {filteredUsers && filteredUsers.length > 0 ? (
        <ul className="max-h-96 md:max-h-full overflow-y-auto overflow-hidden scroll-custom">
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              className="p-2 hover:bg-neutral-800 transition-colors duration-100"
            >
              <SearchUserCard user={user} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-4">
          <span className="text-sm text-neutral-500">No Users Found</span>
        </div>
      )}
    </div>
  );
}

function ContainerStyles(isDropDown: boolean) {
  return isDropDown
    ? "absolute top-full mt-2 w-full bg-neutral-900 rounded-lg shadow-lg z-10"
    : "";
}
