// app/pricing/page.tsx

export default function PricingPage() {
  return (
    <div className="min-h-screen w-full px-6 py-12 md:px-10 lg:px-16 bg-gradient-to-b from-slate-950 via-slate-900 to-black text-slate-50">
      <div className="max-w-4xl mx-auto space-y-10">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            NovaVerse AI Mall
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold">
            Pricing (beta)
          </h1>
          <p className="text-sm md:text-base text-slate-400 max-w-xl">
            Simple early-access pricing while we build out Cloth Plaza, Beauty
            Plaza, Food Plaza and Travel Plaza.
          </p>
        </header>

        <main className="grid gap-6 md:grid-cols-3">
          {/* Free */}
          <div className="rounded-2xl border border-slate-800 bg-white/5 backdrop-blur p-5 flex flex-col justify-between">
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Free</h2>
              <p className="text-2xl font-bold">CHF 0</p>
              <p className="text-xs text-slate-400">
                Try basic outfit and vibe recommendations.
              </p>
              <ul className="mt-3 space-y-1 text-xs text-slate-300">
                <li>• Basic Cloth Plaza access</li>
                <li>• 3 outfits per run</li>
                <li>• No login required</li>
              </ul>
            </div>
            <button className="mt-4 w-full rounded-xl border border-slate-700 bg-slate-900/60 py-2 text-xs font-medium hover:bg-slate-800 transition">
              Start free
            </button>
          </div>

          {/* Creator */}
          <div className="rounded-2xl border border-violet-500/60 bg-violet-950/30 backdrop-blur p-5 flex flex-col justify-between">
            <div className="space-y-3">
              <h2 className="text-lg font-semibold flex items-center justify-between">
                Creator
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-600/30 text-violet-100 border border-violet-500/60">
                  Most popular
                </span>
              </h2>
              <p className="text-2xl font-bold">
                CHF 14<span className="text-sm text-slate-300"> / month</span>
              </p>
              <p className="text-xs text-slate-200">
                For TikTok / IG creators who want daily AI-curated outfits and affiliate-ready fits.
              </p>
              <ul className="mt-3 space-y-1 text-xs text-slate-100">
                <li>• Unlimited Cloth Plaza runs</li>
                <li>• Save & export looks</li>
                <li>• Affiliate link suggestions</li>
                <li>• Early access to Beauty & Travel</li>
              </ul>
            </div>
            <button className="mt-4 w-full rounded-xl bg-violet-500 py-2 text-xs font-medium text-black hover:bg-violet-400 transition">
              Join Creator waitlist
            </button>
          </div>

          {/* Pro */}
          <div className="rounded-2xl border border-slate-800 bg-white/5 backdrop-blur p-5 flex flex-col justify-between">
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Pro Studio</h2>
              <p className="text-2xl font-bold">
                CHF 39<span className="text-sm text-slate-300"> / month</span>
              </p>
              <p className="text-xs text-slate-400">
                For agencies and store owners styling multiple people or products.
              </p>
              <ul className="mt-3 space-y-1 text-xs text-slate-300">
                <li>• Team usage</li>
                <li>• Export-ready shot lists<
