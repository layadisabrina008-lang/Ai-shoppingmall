export function PlazaHeader({title, subtitle, image}:{title:string;subtitle:string;image:string}){
return (
<header className="relative overflow-hidden rounded-2xl border">
<img src={image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-80" />
<div className="relative p-10 md:p-16 bg-gradient-to-tr from-black/60 to-black/10 text-white">
<h1 className="text-3xl md:text-5xl font-semibold">{title}</h1>
<p className="mt-3 max-w-2xl text-white/80">{subtitle}</p>
<div className="mt-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur px-5 py-3 rounded-full">
Start with your vibe
</div>
</div>
</header>
)
}