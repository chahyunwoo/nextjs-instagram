import HomeFillIcon from "@/components/ui/icons/HomeFillIcon";
import HomeIcon from "@/components/ui/icons/HomeIcon";
import NewIcon from "@/components/ui/icons/NewIcon";
import NewFillIcon from "@/components/ui/icons/NewFillIcon";
import SearchIcon from "@/components/ui/icons/SearchIcon";
import SearchFillIcon from "@/components/ui/icons/SearchFillIcon";

export const navlinks = [
  {
    name: "home",
    href: "/",
    defaultIcon: HomeIcon,
    active: HomeFillIcon,
  },
  {
    name: "search",
    href: "/search",
    defaultIcon: SearchIcon,
    active: SearchFillIcon,
  },
  {
    name: "new",
    href: "/new",
    defaultIcon: NewIcon,
    active: NewFillIcon,
  },
];
