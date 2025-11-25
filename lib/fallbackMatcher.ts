import type { StyleInput, OutfitResponse } from "@/types/style"
const img = (q:string) => `https://source.unsplash.com/600x400/?${encodeURIComponent(q)}`
export function fallbackMatch(input: StyleInput): OutfitResponse {
  const tone = input.undertone || "neutral"
  const vibe = input.vibe || "streetwear"
  const budget = input.budget || "mid"
  const palette = tone === "cool" ? ["silver","black","ice blue"]
    : tone === "warm" ? ["gold","cream","olive"] : ["beige","white","navy"]
  const price = budget === "low" ? 39 : budget === "mid" ? 89 : 149
  const vibeMap: Record<string,string[]> = {
    y2k:["denim jacket","baby tee","pleated skirt"],
    grunge:["oversize band tee","cargo pants","combat boots"],
    streetwear:["hoodie","wide-leg pants","chunky sneakers"],
    soft:["cardigan","slip dress","mary janes"],
    minimal:["ribbed tee","straight jeans","white sneakers"],
    coquette:["bow cardigan","lace top","a-line skirt"],
    classic:["blazer","silk blouse","tailored trousers"]
  }
  const picks = (vibeMap[vibe] || vibeMap.streetwear).map(k=>({
    title: `${k} • ${palette[0]}`, image: img(`${k}, fashion flatlay`),
    priceCHF: price, tags:[vibe,tone,palette[0]], via:"Fallback"
  }))
  return { items: picks, explanation: `Using ${tone} palette with ${vibe} vibe`, usedInput: input }
}
