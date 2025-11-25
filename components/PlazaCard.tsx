// components/PlazaCard.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

type Props = {
  href: string;
  title: string;
  subtitle: string;
  img: string;
  badge?: string;
};

export default function PlazaCard({ href, title, subtitle, img, badge = "Plaza" }: Props) {
  return (
    <Link href={href} className="group block">
      <div className="
        relative overflow-hidden rounded-2xl
        bg-neutral-900/60 ring-1 ring-neutral-800
        transition-all duration-200
        hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(255,200,120,0.15)]
      ">
        {/* Square ratio image */}
        <div className="aspect-square relative">
          <Image
            src={img}
            alt={title}
            fill
            className="object-cover object-center opacity-95 transition-opacity duration-200 group-hover:opacity-100"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            priority={false}
          />
        </div>

        {/* golden corner glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_80%_0%,rgba(255,200,120,0.12),transparent)]" />

        {/* top-left badge */}
        <div className="absolute left-3 top-3 rounded-full bg-black/50 px-2 py-1 text-xs text-amber-300 ring-1 ring-amber-300/30 backdrop-blur">
          {badge}
        </div>

        {/* bottom glass info */}
        <div className="
          absolute inset-x-0 bottom-0
          bg-gradient-to-t from-black/80 via-black/40 to-transparent
          px-4 pb-4 pt-12
        ">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-amber-2 00 text-lg font-semibold leading-tight">{title}</h3>
              <p className="mt-1 text-sm text-neutral-300">{subtitle}</p>
            </div>
            <ArrowRight className="ml-3 size-5 text-amber-200 opacity-80 transition-opacity group-hover:opacity-100" />
          </div>
        </div>
      </div>
    </Link>
  );
}

