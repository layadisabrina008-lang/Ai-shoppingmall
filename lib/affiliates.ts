// /lib/affiliates.ts
export type AffiliateExtra = {
  src?: string;     // e.g. "outfit"
  plaza?: string;   // e.g. "cloth"
  uid?: string;     // your user id (or anon id)
  campaign?: string; // optional
};

export function withAffiliate(rawUrl: string, extra: AffiliateExtra = {}) {
  const url = new URL(rawUrl);
  const aff = process.env.NEXT_PUBLIC_AFFILIATE_CODE || "";

  // Minimal "automatic" affiliate: append a generic aff param + UTMs.
  // (You can replace this with network-specific logic later.)
  if (aff) url.searchParams.set("aff", aff);

  if (extra.src) url.searchParams.set("utm_source", extra.src);
  if (extra.plaza) url.searchParams.set("utm_medium", extra.plaza);
  url.searchParams.set("utm_campaign", extra.campaign || "nova-ai-mall");

  return url.toString();
}

/** Build an internal /go/:slug redirect link (so you can log the click). */
export function goUrl(
  product: { slug: string },
  extra: AffiliateExtra = {}
) {
  const q = new URLSearchParams();
  if (extra.src) q.set("src", extra.src);
  if (extra.plaza) q.set("plaza", extra.plaza);
  if (extra.uid) q.set("uid", extra.uid);
  if (extra.campaign) q.set("campaign", extra.campaign);

  const qs = q.toString();
  return `/go/${encodeURIComponent(product.slug)}${qs ? `?${qs}` : ""}`;
}
