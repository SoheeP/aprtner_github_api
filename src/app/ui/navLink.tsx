"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink() {
  const pathname = usePathname();
  const getActiveLinkClassName = (linkHref: string): string => {
    if (pathname === linkHref) {
      return "p-2 border-b-4 border-indigo-500";
    }
    return "p-2";
  };
  return (
    <div className="flex gap-4 px-4">
      <Link href="/" className={getActiveLinkClassName("/")}>
        Home
      </Link>
      <Link href="/bookmark" className={getActiveLinkClassName("/bookmark")}>
        Bookmark
      </Link>
    </div>
  );
}
