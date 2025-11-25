'use client';

import React, { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Copy, ShoppingBag, RefreshCcw } from "lucide-react";

/* ---------------------------- local types & data --------------------------- */

export type Undertone = "cool" | "neutral" | "warm";
export type BodyShape =
  | "hourglass"
  | "pear"
  | "apple"
  | "rectangle"
  | "petite"
  | "tall";

type Gender = "female" | "male";
type ProductCategory = "top" | "bottom" | "shoes" | "accessory";

interface Product {
  id: string;
  category: ProductCategory;
  name: string;
  color: string;
  price: number;
  affiliateUrl: string;
  gender: Gender;
  undertones: Undertone[];
  shapes: BodyShape[];
  vibes: string[];
}

interface Outfit {
  top: Product;
  bottom: Product;
  shoes: Product;
  accessory: Product;
  total: number;
}

const seedProducts: Product[] = [
  // --- Tops ---
  {
    id: "top-1",
    category: "top",
    name: "Oversized graphic tee",
    color: "charcoal",
    price: 39,
    affiliateUrl: "#top-1",
    gender: "female",
    undertones: ["neutral", "warm"],
    shapes: ["rectangle", "apple", "tall"],
    vibes: ["Streetwear", "Grunge"],
  },
  {
    id: "top-2",
    category: "top",
    name: "Cropped baby tee",
    color: "white",
    price: 29,
    affiliateUrl: "#top-2",
    gender: "female",
    undertones: ["cool", "neutral", "warm"],
    shapes: ["hourglass", "pear", "petite"],
    vibes: ["Y2K", "Soft girl", "Minimal"],
  },
  {
    id: "top-3",
    category: "top",
    name: "Boxy sweatshirt",
    color: "heather grey",
    price: 49,
    affiliateUrl: "#top-3",
    gender: "male",
    undertones: ["cool", "neutral"],
    shapes: ["rectangle", "apple", "tall"],
    vibes: ["Streetwear", "Athleisure", "Clean"],
  },
  // --- Bottoms ---
  {
    id: "bottom-1",
    category: "bottom",
    name: "High-waisted baggy jeans",
    color: "mid wash denim",
    price: 59,
    affiliateUrl: "#bottom-1",
    gender: "female",
    undertones: ["neutral", "warm"],
    shapes: ["pear", "hourglass", "rectangle"],
    vibes: ["Streetwear", "Y2K", "Grunge"],
  },
  {
    id: "bottom-2",
    category: "bottom",
    name: "Black straight-leg trousers",
    color: "black",
    price: 69,
    affiliateUrl: "#bottom-2",
    gender: "female",
    undertones: ["cool", "neutral"],
    shapes: ["apple", "tall", "rectangle"],
    vibes: ["Classy", "Minimal", "Clean"],
  },
  {
    id: "bottom-3",
    category: "bottom",
    name: "Relaxed fit sweatpants",
    color: "stone",
    price: 49,
    affiliateUrl: "#bottom-3",
    gender: "male",
    undertones: ["neutral", "warm"],
    shapes: ["rectangle", "apple", "tall"],
    vibes: ["Athleisure", "Streetwear"],
  },
  // --- Shoes ---
  {
    id: "shoes-1",
    category: "shoes",
    name: "Chunky sneakers",
    color: "white",
    price: 89,
    affiliateUrl: "#shoes-1",
    gender: "female",
    undertones: ["cool", "neutral", "warm"],
    shapes: ["hourglass", "pear", "rectangle", "petite", "tall"],
    vibes: ["Streetwear", "Y2K", "Athleisure", "Soft girl"],
  },
  {
    id: "shoes-2",
    category: "shoes",
    name: "Platform ankle boots",
    color: "black",
    price: 99,
    affiliateUrl: "#shoes-2",
    gender: "female",
    undertones: ["cool", "neutral"],
    shapes: ["hourglass", "rectangle", "tall"],
    vibes: ["Grunge", "Classy", "Minimal"],
  },
  {
    id: "shoes-3",
    category: "shoes",
    name: "Retro running sneakers",
    color: "grey/blue",
    price: 79,
    affiliateUrl: "#shoes-3",
    gender: "male",
    undertones: ["cool", "neutral", "warm"],
    shapes: ["rectangle", "apple", "tall"],
    vibes: ["Athleisure", "Streetwear"],
  },
  // --- Accessories ---
  {
    id: "acc-1",
    category: "accessory",
    name: "Mini shoulder bag",
    color: "cream",
    price: 39,
    affiliateUrl: "#acc-1",
    gender: "female",
    undertones: ["warm", "neutral"],
    shapes: ["petite", "hourglass", "pear"],
    vibes: ["Y2K", "Soft girl", "Classy"],
  },
  {
    id: "acc-2",
    category: "accessory",
    name: "Silver chain necklace",
    color: "silver",
    price: 25,
    affiliateUrl: "#acc-2",
    gender: "female",
    undertones: ["cool", "neutral"],
    shapes: ["apple", "rectangle", "tall"],
    vibes: ["Grunge", "Minimal", "Streetwear"],
  },
  {
    id: "acc-3",
    category: "accessory",
    name: "Baseball cap",
    color: "black",
    price: 29,
    affiliateUrl: "#acc-3",
    gender: "male",
    undertones: ["cool", "neutral", "warm"],
    shapes: ["rectangle", "tall", "apple"],
    vibes: ["Streetwear", "Athleisure", "Clean"],
  },
];

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function generateOutfits(
  params: {
    gender: Gender;
    undertone: Undertone;
    bodyShape: BodyShape;
    vibe: string;
    budgetCap?: number;
  },
  products: Product[],
  count: number
): Outfit[] {
  const { gender, undertone, bodyShape, vibe, budgetCap } = params;

  const filtered = products.filter((p) => {
    if (p.gender !== gender) return false;
    if (!p.undertones.includes(undertone)) return false;
    if (!p.shapes.includes(bodyShape)) return false;
    if (!p.vibes.includes(vibe)) return false;
    return true;
  });

  const tops = filtered.filter((p) => p.category === "top");
  const bottoms = filtered.filter((p) => p.category === "bottom");
  const shoes = filtered.filter((p) => p.category === "shoes");
  const accessories = filtered.filter((p) => p.category === "accessory");

  const outfits: Outfit[] = [];

  for (let i = 0; i < count; i++) {
    const top =
      tops.length > 0
        ? pickRandom(tops)
        : pickRandom(products.filter((p) => p.category === "top" && p.gender === gender));

    const bottom =
      bottoms.length > 0
        ? pickRandom(bottoms)
        : pickRandom(products.filter((p) => p.category === "bottom" && p.gender === gender));

    const shoe =
      shoes.length > 0
        ? pickRandom(shoes)
        : pickRandom(products.filter((p) => p.category === "shoes" && p.gender === gender));

    const accessory =
      accessories.length > 0
        ? pickRandom(accessories)
        : pickRandom(products.filter((p) => p.category === "accessory" && p.gender === gender));

    const total = top.price + bottom.price + shoe.price + accessory.price;

    if (budgetCap && total > budgetCap) {
      // skip this combo if above budget
      continue;
    }

    outfits.push({ top, bottom, shoes: shoe, accessory, total });
  }

  // if no outfits under budget, just return something
  if (!outfits.length) {
    const top = pickRandom(products.filter((p) => p.category === "top" && p.gender === gender));
    const bottom = pickRandom(
      products.filter((p) => p.category === "bottom" && p.gender === gender)
    );
    const shoe = pickRandom(
      products.filter((p) => p.category === "shoes" && p.gender === gender)
    );
    const accessory = pickRandom(
      products.filter((p) => p.category === "accessory" && p.gender === gender)
    );
    outfits.push({
      top,
      bottom,
      shoes: shoe,
      accessory,
      total: top.price + bottom.price + shoe.price + accessory.price,
    });
  }

  return outfits.slice(0, count);
}

/* ---------------------------- utility: currency ---------------------------- */

function fmtCHF(n: number) {
  try {
    return new Intl.NumberFormat(
      typeof navigator !== "undefined" ? navigator.language : "de-CH",
      {
        style: "currency",
        currency: "CHF",
        maximumFractionDigits: 0,
      }
    ).format(n);
  } catch {
    return `CHF ${n}`;
  }
}

/* -------------------------------- component -------------------------------- */

export default function OutfitGenerator({
  defaultGender = "female",
  defaultVibe = "Streetwear",
}: {
  defaultGender?: Gender;
  defaultVibe?: string;
}) {
  const [undertone, setUndertone] = useState<Undertone>("neutral");
  const [shape, setShape] = useState<BodyShape>("rectangle");
  const [vibe, setVibe] = useState<string>(defaultVibe);
  const [gender, setGender] = useState<Gender>(defaultGender);
  const [budgetCap, setBudgetCap] = useState<number | undefined>(undefined);
  const [version, setVersion] = useState(0); // re-run trigger

  const outfits = useMemo(
    () =>
      generateOutfits(
        { gender, undertone, bodyShape: shape, vibe, budgetCap },
        seedProducts,
        3
      ),
    [gender, undertone, shape, vibe, budgetCap, version]
  );

  return (
    <div className="space-y-5">
      {/* Prompt card */}
      <Card className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-5">
        <div className="mb-2 text-sm text-white/80">Prompt</div>
        <p className="text-white/90">Selfie → undertone → outfit.</p>

        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-5">
          <Select value={gender} onValueChange={(v) => setGender(v as Gender)}>
            <SelectTrigger>
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="male">Male</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={undertone}
            onValueChange={(v) => setUndertone(v as Undertone)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Undertone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cool">Cool</SelectItem>
              <SelectItem value="neutral">Neutral</SelectItem>
              <SelectItem value="warm">Warm</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={shape}
            onValueChange={(v) => setShape(v as BodyShape)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Body shape" />
            </SelectTrigger>
            <SelectContent>
              {["hourglass", "pear", "apple", "rectangle", "petite", "tall"].map(
                (s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>

          <Select value={vibe} onValueChange={(v) => setVibe(v)}>
            <SelectTrigger>
              <SelectValue placeholder="Vibe" />
            </SelectTrigger>
            <SelectContent>
              {[
                "Streetwear",
                "Y2K",
                "Grunge",
                "Minimal",
                "Clean",
                "Classy",
                "Soft girl",
                "Athleisure",
              ].map((vibeOption) => (
                <SelectItem key={vibeOption} value={vibeOption}>
                  {vibeOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={String(budgetCap ?? "")}
            onValueChange={(v) =>
              setBudgetCap(v ? Number(v) : undefined)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Budget cap (CHF)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">No cap</SelectItem>
              <SelectItem value="150">CHF 150</SelectItem>
              <SelectItem value="250">CHF 250</SelectItem>
              <SelectItem value="350">CHF 350</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <Button
            className="bg-white/10 hover:bg-white/15 border border-white/10"
            onClick={() => setVersion((v) => v + 1)}
          >
            <RefreshCcw className="mr-2 h-4 w-4" /> Regenerate (rules)
          </Button>
        </div>
      </Card>

      {/* 3 sets */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {outfits.map((o, idx) => (
          <Card
            key={idx}
            className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-4"
          >
            <div className="flex items-center justify-between">
              <div className="text-sm text-white/80">Set {idx + 1}</div>
              <Badge className="bg-white/10">{fmtCHF(o.total)}</Badge>
            </div>
            <Separator className="my-3" />
            <div className="space-y-3 text-sm">
              <ItemRow
                label="Top"
                value={`${o.top.name} – ${o.top.color}`}
                price={o.top.price}
                link={o.top.affiliateUrl}
              />
              <ItemRow
                label="Bottom"
                value={`${o.bottom.name} – ${o.bottom.color}`}
                price={o.bottom.price}
                link={o.bottom.affiliateUrl}
              />
              <ItemRow
                label="Shoes"
                value={`${o.shoes.name} – ${o.shoes.color}`}
                price={o.shoes.price}
                link={o.shoes.affiliateUrl}
              />
              <ItemRow
                label="Accessory"
                value={`${o.accessory.name} – ${o.accessory.color}`}
                price={o.accessory.price}
                link={o.accessory.affiliateUrl}
              />
            </div>

            <div className="mt-4 flex items-center gap-2">
              <Button
                className="bg-white/10 hover:bg-white/15 border border-white/10"
                onClick={() => {
                  const text = `Fit ${idx + 1} (${fmtCHF(
                    o.total
                  )}): ${o.top.name}, ${o.bottom.name}, ${o.shoes.name}, ${o.accessory.name}`;
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

function ItemRow({
  label,
  value,
  price,
  link,
}: {
  label: string;
  value: string;
  price: number;
  link: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <div className="text-white/60">{label}</div>
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="text-white/90 hover:underline"
        >
          {value}
        </a>
      </div>
      <div className="shrink-0 text-white/70">{fmtCHF(price)}</div>
    </div>
  );
}


