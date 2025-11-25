export function Timeline({ days }:{ days: {title:string; items:string[]}[] }) {
return (
<div className="rounded-2xl border p-6 bg-white dark:bg-neutral-900">
{days.map((d, i)=>(
<div key={i} className="mb-6 last:mb-0">
<div className="font-semibold">{d.title}</div>
<ul className="mt-2 list-disc pl-6 text-neutral-700 dark:text-neutral-300">
{d.items.map((it, j)=>(<li key={j}>{it}</li>))}
</ul>
</div>
))}
</div>
)
}