import Link from "next/link";
import { ReactNode } from "react";

export default function NavIcon({
  selected,
  icon,
  text,
  link,
}: {
  selected: boolean;
  icon: ReactNode;
  text: string;
  link: string;
}) {
  return (
    <Link
      href={`/${link}`}
      className={`flex items-center space-x-2 p-3 rounded-full transition-all duration-100 ease-in-out ${
        selected ? "bg-lightBackground scale-100" : "bg-transparent scale-90"
      }`}
    >
      <span>{icon}</span>

      {selected && (
        <span className="transition-opacity duration-100 ease-in-out">
          {text}
        </span>
      )}
    </Link>
  );
}
