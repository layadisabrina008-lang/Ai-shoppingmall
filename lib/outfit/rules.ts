import type { Undertone, BodyShape, Product } from "./seed";

export type OutfitInput = {
  gender: "female" | "male";
  undertone: Undertone;
  bodyShape: BodyShape;
  vibe: string;               // e.g., "Streetwear"
  budgetCap?: number;         // optional
};

export type Outfit = {
  top: Product;
  bottom: Product;
  shoes: Product;
  accessory: Product;
  total: number;
};

function score(product: Product, input: OutfitInput): number {
  let s = 0;
  if (product.gender === input.gender || product.gender === "unisex") s += 3;
  if (product.vibes.includes(input.vibe)) s += 3;
  if (product.undertones.includes(input.undertone)) s += 2;
  if (!product.bodyShapes || product.bodyShapes.includes(input.bodyShape)) s += 1;
  return s;
}

export function generateOutfits(
  input: OutfitInput,
  products: Product[],
  count = 3
): Outfit[] {
  // split by category
  const tops = products.filter(p => p.category === "top").sort((a,b)=>score(b,input)-score(a,input));
  const bottoms = products.filter(p => p.category === "bottom").sort((a,b)=>score(b,input)-score(a,input));
  const shoes = products.filter(p => p.category === "shoes").sort((a,b)=>score(b,input)-score(a,input));
  const accs = products.filter(p => p.category === "accessory").sort((a,b)=>score(b,input)-score(a,input));

  const outfits: Outfit[] = [];
  const max = Math.min(count, Math.min(tops.length, bottoms.length, shoes.length, accs.length));

  for (let i = 0; i < max; i++) {
    // deterministic round-robin so sets differ
    const t = tops[i % tops.length];
    const b = bottoms[(i + 1) % bottoms.length];
    const s = shoes[(i + 2) % shoes.length];
    const a = accs[(i + 1) % accs.length];
    const total = t.price + b.price + s.price + a.price;
    if (input.budgetCap && total > input.budgetCap) {
      // try swapping shoes or accessory for cheaper option if available
      const cheaperShoes = shoes.slice().reverse().find(x => x.price <= s.price);
      const cheaperAcc = accs.slice().reverse().find(x => x.price <= a.price);
      const candTotal = t.price + b.price + (cheaperShoes?.price ?? s.price) + (cheaperAcc?.price ?? a.price);
      if (candTotal <= (input.budgetCap ?? Infinity)) {
        outfits.push({ top: t, bottom: b, shoes: cheaperShoes ?? s, accessory: cheaperAcc ?? a, total: candTotal });
        continue;
      }
    }
    outfits.push({ top: t, bottom: b, shoes: s, accessory: a, total });
  }
  return outfits;
}
// 👇 ADD THIS at the end of lib/outfit/rules.ts
export function buildOutfits(
  input: OutfitInput,
  products: Product[],
  count = 3
) {
  // wrap generateOutfits so the debug API can use the old name
  const outfits = generateOutfits(input, products, count);
  return { outfits };
}
