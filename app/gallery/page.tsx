"use client";
import { useEffect, useState } from "react";

export default function GalleryPage() {
  const [shots, setShots] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_BASE + "/style/snapshots")
      .then(r => r.json())
      .then(j => setShots(j.snapshots || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6 animate-pulse">Loading snapshots…</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Try-on Snapshots</h1>
      {shots.length === 0 ? (
        <p className="opacity-70">No snapshots yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {shots.map((url, i) => (
            <img key={i} src={url} className="rounded-xl shadow-md hover:scale-105 transition-transform" />
          ))}
        </div>
      )}
    </div>
  );
}
