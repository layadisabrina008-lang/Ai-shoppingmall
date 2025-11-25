import { PlazaHeader } from '@/components/PlazaHeader'
import { ProductCard } from '@/components/ProductCard'

export default function Beauty() {
return (
<div className="space-y-8">
<PlazaHeader
title="Beauty Plaza"
subtitle="Face scan → tone & type → shade-true routine. Looks that fit you."
image="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1600&auto=format&fit=crop"
/>
<div className="grid md:grid-cols-3 gap-4">
<ProductCard image="https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=1200&auto=format&fit=crop" title="Hydrating Foundation • N2" price="CHF 34" via="Partner"/>
<ProductCard image="https://images.unsplash.com/photo-1619216083420-6f55b39f4b2a?q=80&w=1200&auto=format&fit=crop" title="Soft Rose Blush" price="CHF 22" via="Partner"/>
<ProductCard image="https://images.unsplash.com/photo-1596464716121-cf6b7661c6e6?q=80&w=1200&auto=format&fit=crop" title="Nude Gloss Balm" price="CHF 18" via="Partner"/>
</div>
</div>
)
}