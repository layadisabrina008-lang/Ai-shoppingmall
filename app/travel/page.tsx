// app/travel/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Loader2,
  Plane,
  MapPin,
  CalendarRange,
  Wallet,
  Compass,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const API = process.env.NEXT_PUBLIC_API_BASE ?? "http://127.0.0.1:8000";

type PlanItem = {
  title?: string;
  time?: string;
  place?: string;
  image?: string;
  price_chf?: number;
  notes?: string;
};

type DayPlan = {
  day?: number;
  date?: string;
  items?: PlanItem[];
};

type Summary = {
  city?: string;
  country?: string;
  vibe?: string;
  budget_chf?: number;
  total_cost_chf?: number;
  flight?: {
    airline?: string;
    depart?: string;
    arrive?: string;
    price_chf?: number;
  };
  hotel?: {
    name?: string;
    nights?: number;
    price_per_night_chf?: number;
    total_chf?: number;
    image?: string;
    address?: string;
  };
};

type TripResponse = {
  summary?: Summary;
  days?: DayPlan[];
  tips?: string[];
};

export default function TravelPage() {
  const [vibe, setVibe] = useState("city + food");
  const [budget, setBudget] = useState<number>(600);
  const [nights, setNights] = useState<number>(3);
  const [origin, setOrigin] = useState("ZRH"); // optional
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [trip, setTrip] = useState<TripResponse | null>(null);

  async function plan() {
    setLoading(true);
    setErr(null);
    setTrip(null);
    try {
      const res = await fetch(`${API}/travel/budget`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({
          origin,
          nights,
          budget_chf: budget,
          vibe, // e.g., "beach, nightlife, food", "mountains + calm", etc.
        }),
      });
      const data = (await res.json().catch(() => ({}))) as TripResponse | any;

      // normalize very defensively
      const normalized: TripResponse = {
        summary: data?.summary ?? data?.result?.summary ?? {},
        days: Array.isArray(data?.days)
          ? data.days
          : Array.isArray(data?.itinerary)
          ? data.itinerary
          : [],
        tips: Array.isArray(data?.tips) ? data.tips : [],
      };
      setTrip(normalized);
    } catch (e: any) {
      setErr(e?.message ?? "Failed to generate plan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header / Controls */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-amber-200 flex items-center gap-2">
            <Plane className="h-5 w-5" /> Travel Plaza
          </h1>
          <p className="text-white/60 text-sm mt-1">
            Budget → vibe → auto itinerary.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <label className="flex flex-col text-sm text-white/70">
            <span className="mb-1">Origin</span>
            <input
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="rounded-xl bg-black/30 ring-1 ring-white/10 px-3 py-2 outline-none focus:ring-amber-300/40"
              placeholder="ZRH"
            />
          </label>
          <label className="flex flex-col text-sm text-white/70">
            <span className="mb-1">Nights</span>
            <input
              type="number"
              min={1}
              value={nights}
              onChange={(e) => setNights(Math.max(1, Number(e.target.value)))}
              className="rounded-xl bg-black/30 ring-1 ring-white/10 px-3 py-2 outline-none focus:ring-amber-300/40"
            />
          </label>
          <label className="flex flex-col text-sm text-white/70">
            <span className="mb-1">Budget (CHF)</span>
            <input
              type="number"
              min={100}
              step={50}
              value={budget}
              onChange={(e) => setBudget(Math.max(0, Number(e.target.value)))}
              className="rounded-xl bg-black/30 ring-1 ring-white/10 px-3 py-2 outline-none focus:ring-amber-300/40"
            />
          </label>
          <label className="flex flex-col text-sm text-white/70 md:col-span-1 col-span-2">
            <span className="mb-1">Vibe</span>
            <input
              value={vibe}
              onChange={(e) => setVibe(e.target.value)}
              className="rounded-xl bg-black/30 ring-1 ring-white/10 px-3 py-2 outline-none focus:ring-amber-300/40"
              placeholder="beach, nightlife, food"
            />
          </label>
        </div>

        <button
          onClick={plan}
          className="self-start md:self-auto rounded-xl px-4 py-2 bg-amber-300/20 text-amber-200 ring-1 ring-amber-300/30 hover:bg-amber-300/30 transition"
        >
          Generate itinerary
        </button>
      </div>

      {/* Status */}
      {err && <p className="mt-4 text-sm text-red-300">{err}</p>}
      {loading && (
        <div className="mt-10 flex items-center gap-2 text-white/70">
          <Loader2 className="animate-spin" /> Planning your trip…
        </div>
      )}

      {/* Summary */}
      {trip?.summary && (trip?.summary?.city || trip?.summary?.hotel || trip?.summary?.flight) && (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Destination / Budget card */}
          <Card className="bg-neutral-900/60">
            <CardHeader>
              <CardTitle className="text-amber-200 flex items-center gap-2">
                <Compass className="h-5 w-5" /> Destination
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-white/80 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>
                  {trip.summary.city ?? "TBD"}
                  {trip.summary.country ? `, ${trip.summary.country}` : ""}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarRange className="h-4 w-4" />
                <span>
                  {nights} night{nights > 1 ? "s" : ""} · vibe: {trip.summary.vibe ?? vibe}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                <span>
                  Budget: CHF {budget.toFixed(0)}
                  {typeof trip.summary.total_cost_chf === "number"
                    ? ` · Est. total: CHF ${trip.summary.total_cost_chf.toFixed(0)}`
                    : ""}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Hotel / Flight card */}
          <Card className="bg-neutral-900/60 overflow-hidden">
            <CardHeader>
              <CardTitle className="text-amber-200">Logistics</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-white/80 space-y-4">
              {/* Hotel */}
              {trip.summary.hotel && (
                <div className="flex items-start gap-3">
                  <div className="relative h-16 w-24 overflow-hidden rounded-lg shrink-0">
                    <Image
                      src={
                        trip.summary.hotel.image ??
                        "/placeholder.png"
                      }
                      alt={trip.summary.hotel.name ?? "Hotel"}
                      fill
                      className="object-cover brightness-105 contrast-105"
                      sizes="96px"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{trip.summary.hotel.name ?? "Hotel"}</div>
                    <div className="text-white/70">
                      {trip.summary.hotel.nights ?? nights} nights
                      {typeof trip.summary.hotel.total_chf === "number"
                        ? ` · CHF ${trip.summary.hotel.total_chf.toFixed(0)}`
                        : ""}
                    </div>
                    {trip.summary.hotel.address && (
                      <div className="text-white/60">{trip.summary.hotel.address}</div>
                    )}
                  </div>
                </div>
              )}

              {/* Flight */}
              {trip.summary.flight && (
                <div className="flex items-start gap-3">
                  <Plane className="h-5 w-5 mt-1 shrink-0 text-white/70" />
                  <div className="flex-1">
                    <div className="font-medium">{trip.summary.flight.airline ?? "Flight"}</div>
                    <div className="text-white/70">
                      {trip.summary.flight.depart ?? "—"} → {trip.summary.flight.arrive ?? "—"}
                      {typeof trip.summary.flight.price_chf === "number"
                        ? ` · CHF ${trip.summary.flight.price_chf.toFixed(0)}`
                        : ""}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter />
          </Card>
        </div>
      )}

      {/* Itinerary days */}
      {Array.isArray(trip?.days) && trip!.days!.length > 0 && (
        <div className="mt-10 space-y-6">
          {trip!.days!.map((d, idx) => (
            <Card key={idx} className="bg-neutral-900/60 overflow-hidden">
              <CardHeader>
                <CardTitle className="text-amber-200">
                  Day {d?.day ?? idx + 1}
                  {d?.date ? ` — ${d.date}` : ""}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {(d?.items ?? []).map((it, i) => (
                    <div
                      key={i}
                      className="rounded-xl overflow-hidden ring-1 ring-white/10 bg-black/30"
                    >
                      <div className="relative aspect-video">
                        <Image
                          src={it?.image ?? "/placeholder.png"}
                          alt={it?.title ?? "Activity"}
                          fill
                          className="object-cover brightness-105 contrast-105"
                          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      </div>
                      <div className="p-3">
                        <div className="font-medium text-white">
                          {it?.title ?? "Activity"}
                        </div>
                        <div className="text-sm text-white/70 mt-0.5">
                          {(it?.time ? `${it.time} · ` : "")}
                          {(it?.place ?? "").toString()}
                        </div>
                        <div className="text-sm text-white/70 mt-1">
                          {typeof it?.price_chf === "number"
                            ? `CHF ${it.price_chf.toFixed(0)}`
                            : it?.notes ?? ""}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && !trip && !err && (
        <div className="mt-12 text-white/50 text-sm">
          Set your vibe and budget, then generate an itinerary.
        </div>
      )}
    </div>
  );
}

