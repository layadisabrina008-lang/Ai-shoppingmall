"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/cloth", label: "Cloth" },
  { href: "/beauty", label: "Beauty" },
  { href: "/food", label: "Food" },
  { href: "/travel", label: "Travel" }
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="NovaVerse AI"
            width={40}
            height={40}
            className="rounded-full border border-white/10"
          />
          <span className="text-sm font-semibold tracking-wide text-white/90">
            NovaVerse AI
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="ml-auto hidden items-center gap-2 md:flex">
          {links.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm transition",
                  active
                    ? "text-yellow-400 font-medium"
                    : "text-white/70 hover:text-yellow-300"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <Link
          href="/mall"
          className="rounded-lg bg-yellow-400 px-4 py-2 text-sm font-semibold text-black shadow-sm hover:bg-yellow-300 transition"
        >
          Enter Mall
        </Link>
      </div>
    </header>
  );
}
