"use client";

import { useState } from "react";
import Image from "next/image";
import { Loader2, MapPin, UtensilsCrossed } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

const API = process.env.NEXT_PUBLIC_API_BASE ?? "http://127.0.0.1:8000";

type FoodItem = {
  id?: string | number;
  name?: string;
  title?: string;
  photo_url?: string;
  image?: string;
  price_chf?: number;
  distance_m?: number;
  vendor_name?: string;
  address?: string;
};

export default function FoodPage() {
  const [items, setItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function search() {
    try {
      setLoading(true);
      setErr(null);
      const res = await fetch(`${API}/food/nearby`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lat: 47.477,
          lng: 9.075,
          query: "spicy",
          budget_chf: 20,
          radius_m: 2500,
        }),
        cache: "no-store",
      });
      const data = await res.json().catch(() => ({}));
      const arr = Array.isArray(data?.cards) ? data.cards : [];
      setItems(arr.filter(Boolean)); // guard out undefined entries
    } catch (e: any) {
      setErr(e?.message ?? "Failed to load meals");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-amber-200">Food Plaza</h1>
        <button
          onClick={search}
          className="rounded-xl px-4 py-2 bg-amber-300/20 text-amber-200 ring-1 ring-amber-300/30 hover:bg-amber-300/30 transition"
        >
          Find spicy meals (≤ CHF 20)
        </button>
      </div>

      {err && <p className="mt-4 text-sm text-red-300">{err}</p>}

      {loading && (
        <div className="mt-10 flex items-center gap-2 text-white/70">
          <Loader2 className="animate-spin" /> Loading…
        </div>
      )}

      <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {(items ?? []).filter(Boolean).map((it, i) => (
          <FoodCard key={String(it?.id ?? i)} item={it} />
        ))}
      </div>

      {!loading && items.length === 0 && !err && (
        <div className="mt-12 text-white/50 text-sm">No results yet. Click the button above to search.</div>
      )}
    </div>
  );
}

function FoodCard({ item }: { item?: FoodItem }) {
  // SAFETY: never trust shape, always guard
  const it = item ?? {};
  const title = it.name ?? it.title ?? "Meal";
  const img = it.photo_url ?? it.image ?? "/placeholder.png";
  const price =
    typeof it.price_chf === "number" ? `CHF ${it.price_chf.toFixed(2)}` : "Price —";
  const dist =
    typeof it.distance_m === "number" ? `${Math.round(it.distance_m)} m` : "";
  const vendor = it.vendor_name ?? "";
  const address = it.address ?? "";

  return (
    <Card className="overflow-hidden bg-neutral-900/60">
      <div className="relative aspect-video">
        <Image
          src={img}
          alt={title}
          fill
          quality={85}
          className="object-cover brightness-105 contrast-105 saturate-110"
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      <CardHeader>
        <CardTitle className="text-amber-200">{title}</CardTitle>
      </CardHeader>

      <CardContent className="text-sm text-white/80 space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-medium">{price}</span>
          {dist && (
            <span className="text-white/60">{dist}</span>
          )}
        </div>
        {(vendor || address) && (
          <div className="flex items-start gap-2 text-white/70">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              {vendor}
              {vendor && address ? " — " : ""}
              {address}
            </span>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between text-white/70">
        <div className="flex items-center gap-2">
          <UtensilsCrossed className="h-4 w-4" />
          <span>Open details</span>
        </div>
        <button className="rounded-lg px-3 py-1.5 bg-amber-300/20 text-amber-200 ring-1 ring-amber-300/30 hover:bg-amber-300/30 transition">
          Add
        </button>
      </CardFooter>
    </Card>
  );
}
