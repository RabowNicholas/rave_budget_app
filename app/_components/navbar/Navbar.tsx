"use client";
import {
  CalendarTodayRounded,
  HomeRounded,
  LuggageRounded,
  PersonRounded,
} from "@mui/icons-material";
import NavIcon from "./NavIcon";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <div className="flex justify-between items-center bg-background rounded-full px-6 py-4 mb-4">
      <NavIcon
        link=""
        selected={pathname === "/"}
        icon={<HomeRounded />}
        text="Home"
      />
      <NavIcon
        link="plan"
        selected={pathname === "/plan"}
        icon={<CalendarTodayRounded />}
        text="Plan"
      />
      <NavIcon
        link="pack"
        selected={pathname === "/pack"}
        icon={<LuggageRounded />}
        text="Pack"
      />
      <NavIcon
        link="profile"
        selected={pathname === "/profile"}
        icon={<PersonRounded />}
        text="Profile"
      />
    </div>
  );
}
