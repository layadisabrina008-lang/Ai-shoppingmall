import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
        <div>
          © {new Date().getFullYear()} NovaVerse AI Mall · Comfortable Living
        </div>
        <div className="flex gap-4">
          <Link href="/mall" className="hover:text-white/90">
            Mall
          </Link>
          <Link href="/cloth" className="hover:text-white/90">
            Cloth Plaza
          </Link>
          <Link href="/travel" className="hover:text-white/90">
            Travel Plaza
          </Link>
        </div>
      </div>
    </footer>
  );
}
