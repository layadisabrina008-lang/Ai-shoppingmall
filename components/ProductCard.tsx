export function ProductCard(
{ image, title, price, via }:
{ image:string; title:string; price:string; via?:string }
){
return (
<div className="overflow-hidden rounded-2xl border bg-white dark:bg-neutral-900">
<img src={image} alt={title} className="w-full h-44 object-cover"/>
<div className="p-4">
<div className="font-medium">{title}</div>
<div className="text-brand-600 mt-1">{price}</div>
{via && <div className="text-xs text-neutral-500 mt-2">via {via}</div>}
</div>
</div>
)
}
