export function Aura({ undertone='neutral' }:{undertone?:'cool'|'warm'|'neutral'}) {
  const gradient = undertone==='cool'
    ? 'from-indigo-300 via-blue-300 to-violet-300'
    : undertone==='warm'
    ? 'from-amber-300 via-orange-300 to-rose-300'
    : 'from-stone-200 via-zinc-200 to-slate-200'
  return <div className={`h-28 rounded-2xl bg-gradient-to-r ${gradient} blur-[1px]`} />
}
