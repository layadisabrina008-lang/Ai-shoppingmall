// components/OmniSearch.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

function parseQuery(q: string) {
  const s = q.toLowerCase();
  const money = s.match(/(\d+)\s*(chf|eur|usd)?/i);
  const budget = money ? Number(money[1]) : undefined;
  const distance = s.match(/(\d+)\s*(km|kilometer|kms)/i)?.[1];
  const vibe = /(y2k|street|grunge|classic|kbeauty)/.exec(s)?.[1];

  if (/(cloth|outfit|dress|fit|style)/.test(s)) return { plaza: "cloth", budget, vibe } as const;
  if (/(beauty|skincare|makeup|routine|dewy)/.test(s)) return { plaza: "beauty", budget } as const;
  if (/(food|meal|ramen|spicy|restaurant|near)/.test(s)) return { plaza: "food", budget, distance } as const;
  if (/(travel|trip|flight|hotel|weekend|rome|paris|seoul|tokyo)/.test(s)) return { plaza: "travel", budget } as const;
  return { plaza: "mall" } as const;
}

export function OmniSearch() {
  const [q, setQ] = useState("");
  const router = useRouter();

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    const p = parseQuery(q);
    const params = new URLSearchParams();
    Object.entries(p).forEach(([k, v]) => {
      if (k !== "plaza" && v) params.set(k, String(v));
    });
    router.push(`/${p.plaza}${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <form onSubmit={submit} className="mt-8">
      <div className="flex items-center gap-2 p-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur focus-within:border-gold/70">
        <input
          aria-label="Search NovaVerse"
          placeholder="Try: y2k outfit under 80 chf • spicy 20 chf within 3km • rome weekend 400 chf"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="flex-1 bg-transparent outline-none text-sm md:text-base px-2 py-2"
        />
        <button type="submit" className="btn-gold text-sm">Search</button>
      </div>
      <div className="mt-2 text-xs text-white/60">
        Hints: <span className="text-white/80">“outfit”</span>, <span className="text-white/80">“routine”</span>, <span className="text-white/80">“spicy”</span>, <span className="text-white/80">“weekend”</span>, plus a budget.
      </div>
    </form>
  );
}
