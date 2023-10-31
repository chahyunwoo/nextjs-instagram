import { Navlink } from "@/model/navlink";

import HomeIcon from "@/components/atoms/icons/HomeIcon";
import NewIcon from "@/components/atoms/icons/NewIcon";
import NewFillIcon from "@/components/atoms/icons/NewFillIcon";
import HomeFillIcon from "@/components/atoms/icons/HomeFillIcon";

export const navlinks: Navlink[] = [
  {
    name: "home",
    href: "/",
    defaultIcon: HomeIcon,
    active: HomeFillIcon,
  },
  {
    name: "new",
    href: "/new",
    defaultIcon: NewIcon,
    active: NewFillIcon,
  },
];
