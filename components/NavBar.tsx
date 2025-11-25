"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";


export function Navbar() {
const pathname = usePathname();
const link = (href: string, label: string) => (
<Link href={href} className={`px-3 py-2 rounded-lg transition ${pathname===href?"text-gold":"text-white/80 hover:text-gold"}`}>{label}</Link>
);
return (
<header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-white/10">
<div className="container mx-auto flex items-center gap-4 px-4 py-3">
<Link href="/" className="flex items-center gap-3">
<Image src="/logo.png" alt="NovaVerse AI" width={36} height={36} className="rounded-full" />
<span className="font-semibold tracking-tight">NovaVerse AI</span>
</Link>
<nav className="ml-auto hidden md:flex items-center text-sm">
{link("/", "Home")}
{link("/cloth", "Cloth")}
{link("/beauty", "Beauty")}
{link("/food", "Food")}
{link("/travel", "Travel")}
</nav>
<Link href="/mall" className="btn-gold text-sm">Enter Mall</Link>
</div>
</header>
);
}

