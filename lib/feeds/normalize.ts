// /lib/feeds/normalize.ts
import type { Product } from "@/data/products";

const toNumber = (v: any, fallback = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

export function slugify(s: string) {
  return s.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const mapCategory = (raw: string): Product["category"] => {
  const s = raw?.toLowerCase() || "";
  if (s.includes("shoe") || s.includes("sneaker")) return "shoes";
  if (s.includes("access")) return "accessory";
  if (s.includes("bottom") || s.includes("pant") || s.includes("jean") || s.includes("skirt")) return "bottom";
  return "top";
};

const mapGender = (raw: string): Product["gender"] => {
  const s = raw?.toLowerCase() || "";
  if (s.startsWith("f")) return "female";
  if (s.startsWith("m")) return "male";
  return "unisex";
};

// JSON array -> Product[]
export function normalizeJsonFeed(arr: any[], currency: Product["currency"] = "CHF"): Product[] {
  return arr.map((row, i) => {
    const title = String(row.title || row.name || `Item ${i+1}`).trim();
    return {
      id: String(row.id || row.sku || `json-${i}`),
      slug: slugify(row.slug || `${title}-${row.brand || ""}-${i}`),
      title,
      brand: row.brand || undefined,
      category: mapCategory(row.category || row.type || ""),
      gender: mapGender(row.gender || row.target || ""),
      price: toNumber(row.price),
      currency,
      image: row.image || row.image_url || "/images/placeholder.jpg",
      url: row.url || row.link || "#",
      vibes: row.vibes || [],
      undertones: row.undertones || [],
      shapes: row.shapes || [],
      color: row.color || undefined,
    } satisfies Product;
  });
}

// CSV text -> Product[]
export function normalizeCsvFeed(csv: string, currency: Product["currency"] = "CHF"): Product[] {
  const lines = csv.trim().split(/\r?\n/);
  const header = lines.shift()!.split(",").map(h => h.trim());
  const idx = (key: string) => header.findIndex(h => h.toLowerCase() === key.toLowerCase());

  const idI = idx("id");
  const titleI = idx("title");
  const brandI = idx("brand");
  const catI = idx("category");
  const genderI = idx("gender");
  const priceI = idx("price");
  const imgI = idx("image");
  const urlI = idx("url");
  const colorI = idx("color");

  return lines.map((line, i) => {
    const cols = line.split(",").map(c => c.trim());
    const title = cols[titleI] || `Item ${i+1}`;
    return {
      id: cols[idI] || `csv-${i}`,
      slug: slugify(`${title}-${cols[brandI] || ""}-${i}`),
      title,
      brand: cols[brandI] || undefined,
      category: mapCategory(cols[catI] || ""),
      gender: mapGender(cols[genderI] || ""),
      price: toNumber(cols[priceI]),
      currency,
      image: cols[imgI] || "/images/placeholder.jpg",
      url: cols[urlI] || "#",
      vibes: [],
      undertones: [],
      shapes: [],
      color: cols[colorI] || undefined,
    } as Product;
  });
}
