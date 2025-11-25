'use client'
import { useState } from 'react'
import type { StyleInput, Undertone, FaceShape, BodyShape } from '@/types/style'

const pick = <T extends string>(vals:T[]) => vals.map(v=>({ value:v, label:v.replace(/_/g,' ') }))

const undertones:Undertone[] = ['cool','neutral','warm']
const faces:FaceShape[] = ['oval','round','square','heart','diamond','oblong']
const bodies:BodyShape[] = ['rectangle','pear','apple','hourglass','invertedTriangle']
const skin = ['very_fair','fair','light','medium','tan','deep','very_deep'] as const
const eyes = ['brown','hazel','green','blue','gray','amber'] as const
const hair = ['black','dark_brown','brown','light_brown','blonde','red','gray_white'] as const
const vibe = ['y2k','grunge','streetwear','soft','minimal','coquette','classic'] as const

export function FeatureForm({ onSubmit }:{ onSubmit:(input:StyleInput)=>void }){
  const [val, setVal] = useState<StyleInput>({ budget:'mid' })
  const update = (k:keyof StyleInput) => (e:React.ChangeEvent<HTMLSelectElement>) =>
    setVal(v => ({...v, [k]: e.target.value as any}))

  return (
    <form onSubmit={(e)=>{ e.preventDefault(); onSubmit(val) }} className="grid md:grid-cols-3 gap-4">
      <div className="border rounded-2xl p-4 bg-white dark:bg-neutral-900">
        <label className="text-sm text-neutral-500">Undertone</label>
        <select className="mt-1 w-full border rounded-lg p-2 bg-transparent" onChange={update('undertone')}>
          <option value="">Detect from selfie</option>
          {pick(undertones).map(o=>(<option key={o.value} value={o.value}>{o.label}</option>))}
        </select>
      </div>

      <div className="border rounded-2xl p-4 bg-white dark:bg-neutral-900">
        <label className="text-sm text-neutral-500">Face shape</label>
        <select className="mt-1 w-full border rounded-lg p-2 bg-transparent" onChange={update('faceShape')}>
          <option value="">Auto/skip</option>
          {pick(faces).map(o=>(<option key={o.value} value={o.value}>{o.label}</option>))}
        </select>
      </div>

      <div className="border rounded-2xl p-4 bg-white dark:bg-neutral-900">
        <label className="text-sm text-neutral-500">Body shape</label>
        <select className="mt-1 w-full border rounded-lg p-2 bg-transparent" onChange={update('bodyShape')}>
          <option value="">Auto/skip</option>
          {pick(bodies).map(o=>(<option key={o.value} value={o.value}>{o.label}</option>))}
        </select>
      </div>

      <div className="border rounded-2xl p-4 bg-white dark:bg-neutral-900">
        <label className="text-sm text-neutral-500">Skin tone</label>
        <select className="mt-1 w-full border rounded-lg p-2 bg-transparent" onChange={update('skinTone')}>
          <option value="">Auto/skip</option>
          {pick(skin as any).map(o=>(<option key={o.value} value={o.value}>{o.label}</option>))}
        </select>
      </div>

      <div className="border rounded-2xl p-4 bg-white dark:bg-neutral-900">
        <label className="text-sm text-neutral-500">Eye color</label>
        <select className="mt-1 w-full border rounded-lg p-2 bg-transparent" onChange={update('eyeColor')}>
          <option value="">Auto/skip</option>
          {pick(eyes as any).map(o=>(<option key={o.value} value={o.value}>{o.label}</option>))}
        </select>
      </div>

      <div className="border rounded-2xl p-4 bg-white dark:bg-neutral-900">
        <label className="text-sm text-neutral-500">Hair color</label>
        <select className="mt-1 w-full border rounded-lg p-2 bg-transparent" onChange={update('hairColor')}>
          <option value="">Auto/skip</option>
          {pick(hair as any).map(o=>(<option key={o.value} value={o.value}>{o.label}</option>))}
        </select>
      </div>

      <div className="border rounded-2xl p-4 bg-white dark:bg-neutral-900">
        <label className="text-sm text-neutral-500">Vibe</label>
        <select className="mt-1 w-full border rounded-lg p-2 bg-transparent" onChange={update('vibe')}>
          <option value="">Let AI pick</option>
          {pick(vibe as any).map(o=>(<option key={o.value} value={o.value}>{o.label}</option>))}
        </select>
      </div>

      <div className="border rounded-2xl p-4 bg-white dark:bg-neutral-900">
        <label className="text-sm text-neutral-500">Budget</label>
        <select className="mt-1 w-full border rounded-lg p-2 bg-transparent" value={val.budget} onChange={update('budget')}>
          <option value="low">Low</option>
          <option value="mid">Mid</option>
          <option value="high">High</option>
        </select>
      </div>

      <button type="submit" className="h-[52px] self-end px-5 py-3 rounded-xl text-white bg-brand-600 hover:opacity-90 active:scale-95 transition">
        Generate outfits
      </button>
    </form>
  )
}
