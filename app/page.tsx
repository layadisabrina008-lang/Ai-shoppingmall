// app/page.tsx
import { Hero } from "@/components/Hero";
import { OmniSearch } from "@/components/OmniSearch";
// ❌ import { PlazaCard } from "@/components/PlazaCard";
import PlazaCard from "@/components/PlazaCard"; // ✅ default import

export default function Home() {
  return (
    <main className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_50%_at_50%_0%,rgba(255,200,120,0.08),transparent)]" />
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 space-y-14 md:space-y-16">
        <Hero />
        <OmniSearch />

        <section id="plazas" aria-labelledby="plazas-title" className="scroll-mt-24">
          <div className="mx-auto max-w-4xl text-center">
            <h2 id="plazas-title" className="text-2xl md:text-3xl font-[family-name:var(--font-playfair)] text-amber-200/90 tracking-tight">
              Explore the Plazas
            </h2>
            <div className="mt-4 border-t border-white/10" />
          </div>

          <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <PlazaCard
              href="/cloth"
              title="Cloth Plaza"
              subtitle="Selfie → undertone → outfit match"   // ✅ use subtitle
              img="/plaza-cloth.jpg"
              badge="🧥 Plaza"                              // ✅ optional: show emoji in badge
            />
            <PlazaCard
              href="/beauty"
              title="Beauty Plaza"
              subtitle="Face scan → routine → makeup match"
              img="/plaza-beauty.jpg"
              badge="💄 Plaza"
            />
            <PlazaCard
              href="/food"
              title="Food Plaza"
              subtitle="Budget → spice → nearby meals"
              img="/plaza-food.jpg"
              badge="🍜 Plaza"
            />
            <PlazaCard
              href="/travel"
              title="Travel Plaza"
              subtitle="Budget → vibe → full itinerary"
              img="/plaza-travel.jpg"
              badge="✈️ Plaza"
            />
          </div>
        </section>

        <footer className="pt-10 md:pt-16 border-t border-white/10 text-center text-sm text-white/60">
          © {new Date().getFullYear()} NovaVerse AI Mall — All Rights Reserved
        </footer>
      </div>
    </main>
  );
}
