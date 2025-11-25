'use client'
import { ProductCard } from '@/components/ProductCard'
import type { OutfitItem } from '@/types/style'
export function OutfitGrid({ items }:{ items: OutfitItem[] }){
  if (!items?.length) return null
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {items.map((p,i)=>(
        <a key={i} href={p.affiliateUrl || '#'} target={p.affiliateUrl ? '_blank' : undefined} rel="noopener" className="block">
          <ProductCard image={p.image} title={p.title} price={`CHF ${p.priceCHF.toFixed(0)}`} via={p.via || 'Partner'} />
        </a>
      ))}
    </div>
  )
}
