export type Undertone = "cool" | "neutral" | "warm"
export type FaceShape = "oval" | "round" | "square" | "heart" | "diamond" | "oblong"
export type BodyShape = "rectangle" | "pear" | "apple" | "hourglass" | "invertedTriangle"

export interface StyleInput {
  selfieUrl?: string
  undertone?: Undertone
  faceShape?: FaceShape
  bodyShape?: BodyShape
  skinTone?: "very_fair" | "fair" | "light" | "medium" | "tan" | "deep" | "very_deep"
  eyeColor?: "brown" | "hazel" | "green" | "blue" | "gray" | "amber"
  hairColor?: "black" | "dark_brown" | "brown" | "light_brown" | "blonde" | "red" | "gray_white"
  budget?: "low" | "mid" | "high"
  vibe?: "y2k" | "grunge" | "streetwear" | "soft" | "minimal" | "coquette" | "classic"
}

export interface OutfitItem {
  title: string
  image: string
  priceCHF: number
  via?: string
  tags?: string[]
  affiliateUrl?: string
}

export interface OutfitResponse {
  items: OutfitItem[]
  explanation?: string
  usedInput?: Partial<StyleInput>
}
