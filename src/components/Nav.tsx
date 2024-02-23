"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/ModeToggle";

export function Nav() {
  const pathname = usePathname();
  const isNotRendered =
    (pathname.includes("/signin") ||
      pathname.includes("/signup") ||
      pathname.includes("/quiz")) &&
    !pathname.includes("/dashboard");

  return !isNotRendered ? (
    <nav className="fixed top-0 w-screen h-12 z-50">
      <div className="flex items-center justify-between px-24 py-2 backdrop-blur-xl">
        <Link
          className="scroll-m-20 text-xl font-semibold tracking-tight dark:text-zinc-50"
          href="/"
        >
          APAAN
        </Link>
        <ModeToggle />
      </div>
    </nav>
  ) : null;
}
