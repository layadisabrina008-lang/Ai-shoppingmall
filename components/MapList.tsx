export function MapList(
{ items }:{ items: {name:string; price:string; distance:string; spicy?:boolean}[] }
){
return (
<div className="grid md:grid-cols-2 gap-4">
{items.map((it,i)=>(
<div key={i} className="rounded-2xl border p-4 bg-white dark:bg-neutral-900">
<div className="flex items-center justify-between">
<div className="font-medium">{it.name}</div>
<div className="text-brand-600">{it.price}</div>
</div>
<div className="text-sm text-neutral-600 mt-1">
{it.distance} {it.spicy && '· 🌶️ spicy'}
</div>
<button className="mt-3 px-3 py-2 text-sm rounded-lg border">
Call to order (stub)
</button>
</div>
))}
</div>
)
}