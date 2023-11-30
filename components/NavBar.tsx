"use client";

import {
  UserIcon,
  HomeIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { path: "/", icon: HomeIcon, label: "Home" },
  { path: "/archive", icon: ArchiveBoxIcon, label: "Archive" },
  { path: "/users", icon: UserIcon },
];

export default function NavBar() {
  const pathname = usePathname();
  return (
    <nav className="flex justify-around p-4 bg-gray-700">
      {links.map(({ path, icon: Icon, label }) => (
        <Link
          key={path}
          href={path}
          className={`flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200 ${
            pathname === path
              ? "bg-gray-50 text-gray-900 "
              : "text-white hover:text-gray-900"
          }`}
        >
          <Icon className="mr-1 m-r-2 h-5 w-5" />
          {label}
        </Link>
      ))}
    </nav>
  );
}
