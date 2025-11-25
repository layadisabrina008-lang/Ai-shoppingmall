'use client'
import { useRef, useState } from 'react'
export function UploadSelfie({ onChange }:{ onChange:(url:string)=>void }){
  const ref = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  return (
    <div className="border rounded-2xl p-4 bg-white dark:bg-neutral-900">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium">Selfie (optional)</div>
          <p className="text-sm text-neutral-500">Clear daylight photo for best undertone detection.</p>
        </div>
        <button onClick={()=>ref.current?.click()} className="px-3 py-2 text-sm rounded-lg border">Upload</button>
      </div>
      <input ref={ref} type="file" accept="image/*" hidden onChange={(e)=>{
        const file = e.target.files?.[0]; if(!file) return
        const url = URL.createObjectURL(file); setPreview(url); onChange(url)
      }}/>
      {preview && <img src={preview} alt="Selfie preview" className="mt-3 rounded-xl w-full max-h-64 object-cover" />}
    </div>
  )
}
