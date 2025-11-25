// components/Hero.tsx
import Link from "next/link";

export function Hero() {
  return (
    <section className="mx-auto max-w-4xl text-center space-y-6 pt-10">
      <h1
        className="text-4xl md:text-6xl font-[family-name:var(--font-playfair)] leading-tight
                   bg-gradient-to-r from-[#b48a56] via-[#d4b37c] to-[#b48a56]
                   bg-clip-text text-transparent"
      >
        The AI-Curated Lifestyle Mall
      </h1>

      <p className="text-white/80 text-lg md:text-xl">
        Shop. Style. Travel. Dine — curated by intelligence. Experience fashion, beauty,
        food, and travel through AI.
      </p>

      <div className="flex justify-center gap-4">
        <Link href="#plazas" className="btn-gold">Explore Plazas</Link>
        <Link
          href="/mall"
          className="rounded-2xl px-5 py-2 border border-white/15 hover:border-gold/70 transition"
        >
          Start Free
        </Link>
      </div>
    </section>
  );
}

