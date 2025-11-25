"use client";
export default function TryOnPreview({items}:{items:any}) {
  return (
    <div className="relative w-64 h-96 bg-zinc-100 rounded-xl overflow-hidden">
      <img src="/avatars/mannequin.png" className="absolute inset-0 w-full h-full object-cover opacity-90"/>
      {/* simple overlay tags as placeholder */}
      <div className="absolute bottom-2 left-2 text-xs bg-white/80 p-2 rounded">
        {Object.values(items||{}).slice(0,2).map((it:any)=>it?.title).join(" + ")}
      </div>
    </div>
  );
}
