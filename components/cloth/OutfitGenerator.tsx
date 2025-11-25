'use client';
import React, { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { seedProducts, Undertone, BodyShape } from "@/lib/outfit/seed";
import { generateOutfits } from "@/lib/outfit/rules";
import { Copy, ShoppingBag, RefreshCcw } from "lucide-react";

function fmtCHF(n: number) {
  try { return new Intl.NumberFormat(navigator.language || "de-CH", { style: "currency", currency: "CHF", maximumFractionDigits: 0 }).format(n); }
  catch { return `CHF ${n}`; }
}

export default function OutfitGenerator({
  defaultGender = "female",
  defaultVibe = "Streetwear",
}: { defaultGender?: "female" | "male"; defaultVibe?: string; }) {
  const [undertone, setUndertone] = useState<Undertone>("neutral");
  const [shape, setShape] = useState<BodyShape>("rectangle");
  const [vibe, setVibe] = useState<string>(defaultVibe);
  const [gender, setGender] = useState<"female" | "male">(defaultGender);
  const [budgetCap, setBudgetCap] = useState<number | undefined>(undefined);
  const [version, setVersion] = useState(0); // deterministic re-run trigger

  const outfits = useMemo(() => {
    return generateOutfits({ gender, undertone, bodyShape: shape, vibe, budgetCap }, seedProducts, 3);
  }, [gender, undertone, shape, vibe, budgetCap, version]);

  return (
    <div className="space-y-5">
      {/* Prompt card */}
      <Card className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-5">
        <div className="mb-2 text-sm text-white/80">Prompt</div>
        <p className="text-white/90">Selfie → undertone → outfit.</p>

        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-5">
          <Select value={gender} onValueChange={(v) => setGender(v as any)}>
            <SelectTrigger><SelectValue placeholder="Gender" /></SelectTrigger>
            <SelectContent><SelectItem value="female">Female</SelectItem><SelectItem value="male">Male</SelectItem></SelectContent>
          </Select>

          <Select value={undertone} onValueChange={(v) => setUndertone(v as Undertone)}>
            <SelectTrigger><SelectValue placeholder="Undertone" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="cool">Cool</SelectItem>
              <SelectItem value="neutral">Neutral</SelectItem>
              <SelectItem value="warm">Warm</SelectItem>
            </SelectContent>
          </Select>

          <Select value={shape} onValueChange={(v) => setShape(v as any)}>
            <SelectTrigger><SelectValue placeholder="Body shape" /></SelectTrigger>
            <SelectContent>
              {["hourglass","pear","apple","rectangle","petite","tall"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>

          <Select value={vibe} onValueChange={(v) => setVibe(v)}>
            <SelectTrigger><SelectValue placeholder="Vibe" /></SelectTrigger>
            <SelectContent>
              {["Streetwear","Y2K","Grunge","Minimal","Clean","Classy","Soft girl","Athleisure"].map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
            </SelectContent>
          </Select>

          <Select value={String(budgetCap ?? "")} onValueChange={(v) => setBudgetCap(v ? Number(v) : undefined)}>
            <SelectTrigger><SelectValue placeholder="Budget cap (CHF)" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="">No cap</SelectItem>
              <SelectItem value="150">CHF 150</SelectItem>
              <SelectItem value="250">CHF 250</SelectItem>
              <SelectItem value="350">CHF 350</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <Button className="bg-white/10 hover:bg-white/15 border border-white/10" onClick={() => setVersion(v => v + 1)}>
            <RefreshCcw className="mr-2 h-4 w-4" /> Regenerate (rules)
          </Button>
        </div>
      </Card>

      {/* 3 sets */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {outfits.map((o, idx) => (
          <Card key={idx} className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-white/80">Set {idx + 1}</div>
              <Badge className="bg-white/10">{fmtCHF(o.total)}</Badge>
            </div>
            <Separator className="my-3" />
            <div className="space-y-3 text-sm">
              <ItemRow label="Top" value={`${o.top.name} – ${o.top.color}`} price={o.top.price} link={o.top.affiliateUrl} />
              <ItemRow label="Bottom" value={`${o.bottom.name} – ${o.bottom.color}`} price={o.bottom.price} link={o.bottom.affiliateUrl} />
              <ItemRow label="Shoes" value={`${o.shoes.name} – ${o.shoes.color}`} price={o.shoes.price} link={o.shoes.affiliateUrl} />
              <ItemRow label="Accessory" value={`${o.accessory.name} – ${o.accessory.color}`} price={o.accessory.price} link={o.accessory.affiliateUrl} />
            </div>

            <div className="mt-4 flex items-center gap-2">
              <Button
                className="bg-white/10 hover:bg-white/15 border border-white/10"
                onClick={() => {
                  const text = `Fit ${idx + 1} (${fmtCHF(o.total)}): ${o.top.name}, ${o.bottom.name}, ${o.shoes.name}, ${o.accessory.name}`;
                  navigator.clipboard?.writeText(text);
                }}
              >
                <Copy className="mr-2 h-4 w-4" /> Copy fit
              </Button>
              <Button asChild>
                <a href={o.top.affiliateUrl} target="_blank" rel="noreferrer">
                  <ShoppingBag className="mr-2 h-4 w-4" /> Buy (affiliate)
                </a>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ItemRow({ label, value, price, link }: { label: string; value: string; price: number; link: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <div className="text-white/60">{label}</div>
        <a href={link} target="_blank" rel="noreferrer" className="text-white/90 hover:underline">
          {value}
        </a>
      </div>
      <div className="shrink-0 text-white/70">{fmtCHF(price)}</div>
    </div>
  );
}

