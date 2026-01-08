"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function HeaderNav() {
  return (
    <nav className="flex items-center gap-3 text-sm">
      <Link href="/bookings" className="rounded-md px-2 py-1 text-white transition hover:bg-white/10">
        Bookings
      </Link>
      <Link href="/booking/new" className="rounded-md px-2 py-1 text-white transition hover:bg-white/10">
        New booking
      </Link>
      <ThemeToggle />
    </nav>
  );
}


