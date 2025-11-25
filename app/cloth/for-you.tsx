"use client";
import { useEffect, useState } from "react";

export default function ForYou() {
  const [setData, setSetData] = useState<any|null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_BASE + "/style/recommend?user_id=u1")
      .then(r => r.json())
      .then(j => setSetData(j.set))
      .finally(()=>setLoading(false));
  }, []);

  if (loading) return <p className="p-6 animate-pulse">Loading personalized look…</p>;
  if (!setData) return <p>No recommendations yet — like some outfits first ❤️</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">For You</h1>
      <div className="border p-4 rounded-xl space-y-2">
        {["top","bottom","shoes","accessory"].map(slot=>{
          const item=setData.items?.[slot]; if(!item) return null;
          return (
            <div key={slot} className="flex gap-3 items-center">
              <img src={item.image} className="w-14 h-14 object-cover rounded"/>
              <div className="flex-1">
                <div className="font-medium">{item.title}</div>
                <div className="text-xs opacity-70">{item.brand} • {item.price} {item.currency}</div>
              </div>
              <a href={item.affiliate_url} target="_blank" className="text-xs underline">Buy</a>
            </div>
          );
        })}
        <div className="pt-2 font-semibold">
          Total {setData.total} {setData.currency}
        </div>
      </div>
    </div>
  );
}
