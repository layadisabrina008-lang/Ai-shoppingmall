"use client";

import React, { useEffect, useState } from "react";
import OutfitGenerator from "@/components/cloth/OutfitGenerator";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  Shirt,
  Sparkles,
  UtensilsCrossed,
  Plane,
  Settings,
  User,
  Wand2,
} from "lucide-react";

/* ----------------------------- helpers & theme ----------------------------- */

// analytics (swap console.log for your endpoint when ready)
function track(event: string, props: Record<string, any> = {}) {
  const payload = { event, ts: Date.now(), ...props };
  // @ts-ignore
  if (typeof window !== "undefined" && window.dataLayer) {
    // @ts-ignore
    window.dataLayer.push(payload);
  }
  console.log("[analytics]", payload);
}

// currency formatter used in tiles
function fmtCurrency(
  value: number,
  currency: string = "CHF",
  locale: string = "de-CH"
): string {
  if (value == null || isNaN(Number(value))) return "";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(value));
}

// **Calmer** glass token
const glass =
  "bg-white/[0.04] backdrop-blur border border-white/10 shadow-[0_10px_30px_-18px_rgba(0,0,0,.6)]";

// vibe options
const VIBES = [
  "Streetwear",
  "Y2K",
  "Grunge",
  "Minimal",
  "Clean",
  "Classy",
  "Athleisure",
  "Soft girl",
] as const;

// plazas
const PLAZAS = [
  {
    key: "cloth",
    title: "Cloth Plaza",
    desc: "Outfit recommender — selfie → undertone → vibe match.",
    icon: <Shirt className="h-5 w-5" />,
    cta: "Style me",
  },
  {
    key: "beauty",
    title: "Beauty Plaza",
    desc: "Skin & makeup recommender — tones, looks, products.",
    icon: <Sparkles className="h-5 w-5" />,
    cta: "Glow up",
  },
  {
    key: "food",
    title: "Food Plaza",
    desc: "Nearby meals in budget — spicy? vegan? call-to-order.",
    icon: <UtensilsCrossed className="h-5 w-5" />,
    cta: "Find meals",
  },
  {
    key: "travel",
    title: "Travel Plaza",
    desc: "Budget + vibe → AI itinerary with rich booking cards.",
    icon: <Plane className="h-5 w-5" />,
    cta: "Plan trip",
  },
] as const;

/* ------------------------------- PlazaTile -------------------------------- */

function PlazaTile({
  icon,
  title,
  desc,
  vibe,
  gender,
  budget,
  onPrimary,
  onAdjust,
  primaryLabel,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  vibe: string;
  gender: string;
  budget: string;
  onPrimary: () => void;
  onAdjust: () => void;
  primaryLabel: string;
}) {
  return (
    <Card
      className={`rounded-2xl ${glass} transition hover:-translate-y-0.5 hover:bg-white/[0.06]`}
    >
      <div className="p-6">
        <div className="mb-3 flex items-center gap-3">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 border border-white/10">
            {icon}
          </div>
          <h3 className="text-base font-semibold">{title}</h3>
        </div>

        <p className="mb-4 text-sm text-white/70">{desc}</p>

        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
          <Badge className="bg-white/10">Vibe: {vibe}</Badge>
          <Badge className="bg-white/10">Gender: {gender}</Badge>
          <Badge className="bg-white/10">Budget: {budget}</Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button
            className="bg-white/10 hover:bg-white/15 border border-white/10"
            onClick={onPrimary}
          >
            <Wand2 className="mr-2 h-4 w-4" />
            {primaryLabel}
          </Button>
          <Button
            variant="secondary"
            className="bg-transparent hover:bg-white/8 border border-white/10"
            onClick={onAdjust}
          >
            Adjust profile
          </Button>
        </div>
      </div>
    </Card>
  );
}

/* ---------------------------------- page ---------------------------------- */

export default function MallShell() {
  const [active, setActive] = useState<string>("home");
  const [openWizard, setOpenWizard] = useState(false);
  const [gender, setGender] = useState("female");
  const [vibe, setVibe] = useState<string>("Streetwear");
  const [tops, setTops] = useState("S");
  const [bottoms, setBottoms] = useState("S");
  const [skin, setSkin] = useState("normal");
  const [budget, setBudget] = useState<number>(150);

  // Track page view once
  useEffect(() => {
    track("page_view", { page: "mall_shell" });
  }, []);

  // Load saved profile when page opens
  useEffect(() => {
    try {
      const raw = localStorage.getItem("mall_profile");
      if (!raw) return;
      const p = JSON.parse(raw);
      if (p.gender) setGender(p.gender);
      if (p.vibe) setVibe(p.vibe);
      if (p.tops) setTops(p.tops);
      if (p.bottoms) setBottoms(p.bottoms);
      if (p.skin) setSkin(p.skin);
      if (typeof p.budget === "number") setBudget(p.budget);
    } catch {
      // ignore
    }
  }, []);

  // Auto-save profile
  useEffect(() => {
    const id = setTimeout(() => {
      const payload = { gender, vibe, tops, bottoms, skin, budget };
      localStorage.setItem("mall_profile", JSON.stringify(payload));
    }, 200);
    return () => clearTimeout(id);
  }, [gender, vibe, tops, bottoms, skin, budget]);

  const activePlaza = PLAZAS.find((p) => p.key === active as (typeof PLAZAS)[number]["key"]);

  return (
    <div className="relative min-h-screen text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_60%)]" />
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-40 ${glass}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-white/10 border border-white/10" />
            <span className="text-xs tracking-[0.16em] text-white/80">
              AI SHOPPING MALL · Comfortable Living
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              className="bg-white/8 hover:bg-white/12 border border-white/10"
              onClick={() => setOpenWizard(true)}
            >
              <User className="mr-2 h-4 w-4" />
              Profile Wizard
            </Button>
            <Button
              variant="secondary"
              className="bg-white/8 hover:bg-white/12 border border-white/10"
              onClick={() => track("click", { target: "settings" })}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
        <div className="mx-auto max-w-7xl border-b border-white/10" />
      </header>

      {/* Main */}
      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-8 lg:grid-cols-4">
        {/* Sidebar */}
        <aside className={`rounded-2xl p-4 ${glass}`}>
          <nav className="space-y-1">
            <SideItem
              icon={<Home className="h-4 w-4" />}
              label="Home"
              active={active === "home"}
              onClick={() => setActive("home")}
            />
            {PLAZAS.map((p) => (
              <SideItem
                key={p.key}
                icon={p.icon}
                label={p.title}
                active={active === p.key}
                onClick={() => setActive(p.key)}
              />
            ))}
          </nav>
          <Separator className="my-4" />
          <p className="text-xs text-white/70">
            Tip: complete your{" "}
            <button className="underline" onClick={() => setOpenWizard(true)}>
              profile wizard
            </button>{" "}
            to personalize all plazas.
          </p>
        </aside>

        {/* Content */}
        <section className="space-y-6 lg:col-span-3">
          {/* Home grid */}
          {active === "home" && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {PLAZAS.map((p) => (
                <PlazaTile
                  key={p.key}
                  icon={p.icon}
                  title={p.title}
                  desc={p.desc}
                  vibe={vibe}
                  gender={gender}
                  budget={fmtCurrency(budget, "CHF")}
                  primaryLabel={p.cta}
                  onPrimary={() => {
                    setActive(p.key);
                    track("click", { target: `enter_${p.key}` });
                  }}
                  onAdjust={() => setOpenWizard(true)}
                />
              ))}
            </div>
          )}

          {/* Active plaza */}
          {active !== "home" && (
            <Card className={`rounded-2xl ${glass}`}>
              <div className="p-6 space-y-4">
                <div className="mb-2 flex items-center gap-3">
                  {activePlaza?.icon}
                  <h3 className="text-base font-semibold">
                    {activePlaza?.title ?? "Plaza"}
                  </h3>
                </div>

                {active === "cloth" ? (
                  <>
                    {/* Profile strip */}
                    <div className="flex flex-wrap gap-2 text-xs">
                      <Badge className="bg-white/10">Vibe: {vibe}</Badge>
                      <Badge className="bg-white/10">Gender: {gender}</Badge>
                      <Badge className="bg-white/10">Tops: {tops}</Badge>
                      <Badge className="bg-white/10">Bottoms: {bottoms}</Badge>
                      <Badge className="bg-white/10">Skin: {skin}</Badge>
                      <Badge className="bg-white/10">
                        Budget: {fmtCurrency(budget, "CHF")}
                      </Badge>
                    </div>

                    <OutfitGenerator
                      defaultGender={gender as "female" | "male"}
                      defaultVibe={vibe}
                    />
                  </>
                ) : (
                  <div className="rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-white/70">
                    Plaza content placeholder. Hook your API endpoints here.
                  </div>
                )}
              </div>
            </Card>
          )}
        </section>
      </main>

      {/* Profile Wizard */}
      <Drawer open={openWizard} onOpenChange={setOpenWizard}>
        <DrawerContent className={`mx-auto max-w-2xl ${glass}`}>
          <DrawerHeader>
            <DrawerTitle>Profile Wizard</DrawerTitle>
          </DrawerHeader>
          <div className="grid grid-cols-1 gap-6 px-6 pb-2 md:grid-cols-2">
            {/* Gender */}
            <div>
              <Label className="text-white/90">Gender</Label>
              <RadioGroup
                value={gender}
                onValueChange={(v) => setGender(v)}
                className="mt-2 grid grid-cols-2 gap-2"
              >
                {[
                  { k: "female", l: "Female" },
                  { k: "male", l: "Male" },
                ].map((g) => (
                  <Label
                    key={g.k}
                    htmlFor={`g-${g.k}`}
                    className={`flex cursor-pointer items-center gap-2 rounded-xl p-3 ${glass}`}
                  >
                    <RadioGroupItem id={`g-${g.k}`} value={g.k} />
                    {g.l}
                  </Label>
                ))}
              </RadioGroup>
            </div>

            {/* Vibe */}
            <div>
              <Label className="text-white/90">Style vibe</Label>
              <Select value={vibe} onValueChange={setVibe}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Choose vibe" />
                </SelectTrigger>
                <SelectContent>
                  {VIBES.map((v) => (
                    <SelectItem key={v} value={v}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sizes */}
            <div>
              <Label className="text-white/90">Top size</Label>
              <Select value={tops} onValueChange={setTops}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["XS", "S", "M", "L", "XL"].map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-white/90">Bottom size</Label>
              <Select value={bottoms} onValueChange={setBottoms}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["XS", "S", "M", "L", "XL"].map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Skin */}
            <div>
              <Label className="text-white/90">Skin type</Label>
              <Select value={skin} onValueChange={setSkin}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["normal", "oily", "dry", "combination", "sensitive"].map(
                    (s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Budget */}
            <div>
              <Label className="text-white/90">
                Monthly fashion/beauty budget (CHF)
              </Label>
              <div className="mt-3">
                <Slider
                  value={[budget]}
                  min={50}
                  max={1000}
                  step={10}
                  onValueChange={(v) => setBudget(v[0])}
                />
                <div className="mt-2 text-sm text-white/80">
                  {fmtCurrency(budget, "CHF")}
                </div>
              </div>
            </div>
          </div>
          <DrawerFooter className="px-6 pb-6">
            <div className="flex items-center justify-between">
              <div className="text-xs text-white/70">
                Your profile personalizes all plazas and elevates comfortable
                living.
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  className="bg-white/10 hover:bg-white/15 border border-white/10"
                  onClick={() => setOpenWizard(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    track("profile_save", {
                      gender,
                      vibe,
                      tops,
                      bottoms,
                      skin,
                      budget,
                    });
                    setOpenWizard(false);
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Footer */}
      <footer className="mx-auto max-w-7xl px-6 pb-10 pt-2 text-center text-xs text-white/60">
        © {new Date().getFullYear()} AI Shopping Mall · Comfortable Living
      </footer>
    </div>
  );
}

/* --------------------------------- bits ---------------------------------- */

function SideItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={() => {
        onClick?.();
        track("click", { target: `nav_${label}` });
      }}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 transition ${
        active ? "bg-white/12" : "hover:bg-white/8"
      }`}
    >
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/10">
        {icon}
      </span>
      <span className="text-sm">{label}</span>
    </button>
  );
}


