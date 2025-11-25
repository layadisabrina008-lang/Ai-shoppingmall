// lib/outfit/seed.ts

export type Undertone = "cool" | "warm" | "neutral";
export type BodyShape = "hourglass" | "pear" | "apple" | "rectangle" | "petite" | "tall";
export type Category = "top" | "bottom" | "shoes" | "accessory";

export type Product = {
  id: string;
  name: string;
  brand?: string;
  category: Category;
  gender: "female" | "male" | "unisex";
  vibes: string[];          // e.g. ["Streetwear", "Minimal"]
  undertones: Undertone[];  // compatible undertones
  bodyShapes?: BodyShape[]; // optional body-shape fit info
  color: string;
  price: number;            // CHF
  imageUrl?: string;        // optional image URL
  affiliateUrl?: string;    // optional affiliate link
};

export const PRODUCTS: Product[] = [
  // TOPS
  {
    id: "t1",
    name: "Oversized Graphic Tee",
    brand: "NovaVerse Basic",
    category: "top",
    gender: "unisex",
    vibes: ["Streetwear", "Y2K"],
    undertones: ["neutral", "cool", "warm"],
    bodyShapes: ["rectangle", "apple", "tall"],
    color: "white",
    price: 29,
    affiliateUrl: "#",
  },
  {
    id: "t2",
    name: "Fitted Ribbed Longsleeve",
    brand: "Soft Line",
    category: "top",
    gender: "female",
    vibes: ["Soft girl", "Clean"],
    undertones: ["cool", "neutral"],
    bodyShapes: ["hourglass", "pear", "petite"],
    color: "cream",
    price: 39,
    affiliateUrl: "#",
  },
  {
    id: "t3",
    name: "Boxy Crop Hoodie",
    brand: "UrbanCloud",
    category: "top",
    gender: "female",
    vibes: ["Streetwear", "Grunge"],
    undertones: ["warm", "neutral"],
    bodyShapes: ["apple", "rectangle"],
    color: "charcoal",
    price: 49,
    affiliateUrl: "#",
  },

  // BOTTOMS
  {
    id: "b1",
    name: "High-Waisted Wide Leg Jeans",
    brand: "Denim Lab",
    category: "bottom",
    gender: "female",
    vibes: ["Streetwear", "Clean"],
    undertones: ["cool", "neutral"],
    bodyShapes: ["pear", "hourglass", "tall"],
    color: "mid-blue",
    price: 69,
    affiliateUrl: "#",
  },
  {
    id: "b2",
    name: "Straight-Leg Tailored Trousers",
    brand: "City Line",
    category: "bottom",
    gender: "unisex",
    vibes: ["Classy", "Minimal"],
    undertones: ["neutral", "warm"],
    bodyShapes: ["rectangle", "apple"],
    color: "black",
    price: 79,
    affiliateUrl: "#",
  },
  {
    id: "b3",
    name: "Pleated Mini Skirt",
    brand: "Y2K Club",
    category: "bottom",
    gender: "female",
    vibes: ["Y2K", "Soft girl"],
    undertones: ["warm", "neutral"],
    bodyShapes: ["petite", "hourglass"],
    color: "baby pink",
    price: 45,
    affiliateUrl: "#",
  },

  // SHOES
  {
    id: "s1",
    name: "Chunky Sneakers",
    brand: "Nova Kicks",
    category: "shoes",
    gender: "unisex",
    vibes: ["Streetwear", "Y2K"],
    undertones: ["neutral", "cool", "warm"],
    color: "white",
    price: 99,
    affiliateUrl: "#",
  },
  {
    id: "s2",
    name: "Classic Loafers",
    brand: "City Line",
    category: "shoes",
    gender: "unisex",
    vibes: ["Classy", "Minimal", "Clean"],
    undertones: ["neutral", "cool"],
    color: "espresso",
    price: 129,
    affiliateUrl: "#",
  },
  {
    id: "s3",
    name: "Chelsea Boots",
    brand: "Night Walk",
    category: "shoes",
    gender: "unisex",
    vibes: ["Clean", "Grunge", "Classy"],
    undertones: ["warm", "neutral"],
    color: "black",
    price: 139,
    affiliateUrl: "#",
  },

  // ACCESSORIES
  {
    id: "a1",
    name: "Minimal Leather Belt",
    brand: "Core Essentials",
    category: "accessory",
    gender: "unisex",
    vibes: ["Clean", "Minimal", "Classy"],
    undertones: ["warm", "neutral", "cool"],
    color: "black",
    price: 39,
    affiliateUrl: "#",
  },
  {
    id: "a2",
    name: "Gold Huggie Earrings",
    brand: "Glowline",
    category: "accessory",
    gender: "female",
    vibes: ["Soft girl", "Classy", "Minimal"],
    undertones: ["warm", "neutral"],
    color: "gold",
    price: 45,
    affiliateUrl: "#",
  },
  {
    id: "a3",
    name: "Steel Link Watch",
    brand: "Metro Time",
    category: "accessory",
    gender: "unisex",
    vibes: ["Clean", "Classy"],
    undertones: ["cool", "neutral"],
    color: "silver",
    price: 149,
    affiliateUrl: "#",
  },
];
