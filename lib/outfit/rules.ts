// lib/outfit/rules.ts
import type { Undertone, BodyShape, Product } from "./seed";

export type OutfitInput = {
  gender: "female" | "male";
  undertone: Undertone;
  bodyShape: BodyShape;
  vibe: string;        // e.g. "Streetwear"
  budgetCap?: number;  // optional CHF max
};

export type Outfit = {
  top: Product;
  bottom: Product;
  shoes: Product;
  accessory: Product;
  total: number;
};

/* -------------------------------------------------------------------------- */
/*                                 SCORING                                    */
/* -------------------------------------------------------------------------- */

function scoreProduct(product: Product, input: OutfitInput): number {
  let s = 0;

  // gender match
  if (product.gender === input.gender) s += 4;
  else if (product.gender === "unisex") s += 2;

  // vibe match
  if (product.vibes?.includes(input.vibe)) s += 4;

  // undertone match
  if (product.undertones?.includes(input.undertone)) s += 3;

  // body shape match (if present)
  if (!product.bodyShapes || product.bodyShapes.includes(input.bodyShape)) {
    s += 2;
  }

  return s;
}

function sortByScore(products: Product[], input: OutfitInput): Product[] {
  return [...products].sort((a, b) => scoreProduct(b, input) - scoreProduct(a, input));
}

/* -------------------------------------------------------------------------- */
/*                          CORE OUTFIT GENERATION                            */
/* -------------------------------------------------------------------------- */

export function generateOutfits(
  input: OutfitInput,
  products: Product[],
  count = 3
): Outfit[] {
  // group by category
  const tops = sortByScore(products.filter(p => p.category === "top"), input);
  const bottoms = sortByScore(products.filter(p => p.category === "bottom"), input);
  const shoes = sortByScore(products.filter(p => p.category === "shoes"), input);
  const accs = sortByScore(products.filter(p => p.category === "accessory"), input);

  if (!tops.length || !bottoms.length || !shoes.length || !accs.length) {
    return [];
  }

  const outfits: Outfit[] = [];
  const max = Math.min(
    count,
    tops.length,
    bottoms.length,
    shoes.length,
    accs.length
  );

  for (let i = 0; i < max; i++) {
    // slightly rotate indices for variety
    const t = tops[i % tops.length];
    const b = bottoms[(i + 1) % bottoms.length];
    const s = shoes[(i + 2) % shoes.length];
    const a = accs[(i + 3) % accs.length];

    let total = t.price + b.price + s.price + a.price;

    // If budgetCap given & we exceed it, try to swap for cheaper shoes/accs
    if (input.budgetCap && total > input.budgetCap) {
      const cheaperShoes = [...shoes]
        .sort((p1, p2) => p1.price - p2.price)
        .find(x => x.price <= s.price);

      const cheaperAcc = [...accs]
        .sort((p1, p2) => p1.price - p2.price)
        .find(x => x.price <= a.price);

      const finalShoes = cheaperShoes ?? s;
      const finalAcc = cheaperAcc ?? a;

      const newTotal = t.price + b.price + finalShoes.price + finalAcc.price;

      if (!input.budgetCap || newTotal <= input.budgetCap) {
        outfits.push({
          top: t,
          bottom: b,
          shoes: finalShoes,
          accessory: finalAcc,
          total: newTotal,
        });
        continue;
      }
    }

    outfits.push({ top: t, bottom: b, shoes: s, accessory: a, total });
  }

  // If nothing fit the budgetCap at all, still return up to count best combos
  if (!outfits.length) {
    for (let i = 0; i < max; i++) {
      const t = tops[i % tops.length];
      const b = bottoms[(i + 1) % bottoms.length];
      const s = shoes[(i + 2) % shoes.length];
      const a = accs[(i + 3) % accs.length];
      const total = t.price + b.price + s.price + a.price;
      outfits.push({ top: t, bottom: b, shoes: s, accessory: a, total });
    }
  }

  return outfits;
}

/* -------------------------------------------------------------------------- */
/*                     DEBUG / API COMPAT: buildOutfits                       */
/* -------------------------------------------------------------------------- */

export function buildOutfits(
  input: OutfitInput,
  products: Product[],
  count = 3
) {
  const outfits = generateOutfits(input, products, count);

  return {
    outfits,
    meta: {
      requestedCount: count,
      returnedCount: outfits.length,
      budgetCap: input.budgetCap ?? null,
      vibe: input.vibe,
      gender: input.gender,
      undertone: input.undertone,
      bodyShape: input.bodyShape,
    },
  };
}
