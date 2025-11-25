'use client'

import { useState } from 'react'

import { API } from '@/lib/api'



export function MirrorPanel({ selfieUrl, summary }: { selfieUrl?: string, summary: string }) {

  const [job, setJob] = useState<string | null>(null)

  const [video, setVideo] = useState<string | null>(null)

  const [loading, setLoading] = useState(false)



  const run = async () => {

    if (!selfieUrl) return

    setLoading(true); setVideo(null)

    const res = await fetch(API('/character/speak'), {

      method:'POST', headers:{'content-type':'application/json'},

      body: JSON.stringify({ selfie_url: selfieUrl, text: summary })

    })

    const { job_id } = await res.json()

    setJob(job_id)



    const poll = async () => {

      const r = await fetch(API(`/character/speak/${job_id}`))

      const j = await r.json()

      if (j.status === 'done' && j.result?.video_url) {

        setVideo(j.result.video_url); setLoading(false); return

      }

      setTimeout(poll, 1500)

    }

    poll()

  }



  return (

    <div className="border rounded-2xl p-4 bg-white/70 dark:bg-neutral-900/60 backdrop-blur">

      <div className="flex items-center justify-between">

        <div className="font-medium">MirrorVerse Preview</div>

        <button onClick={run} disabled={!selfieUrl || loading}

          className="px-3 py-2 rounded-lg bg-brand-600 text-white disabled:opacity-50">

          {loading ? 'Rendering…' : 'Hear my stylist'}

        </button>

      </div>

      {video && (

        <video src={video} controls playsInline className="mt-3 w-full rounded-xl" />

      )}

      {!video && !loading && <p className="text-sm text-neutral-500 mt-2">

        Upload a selfie, then click “Hear my stylist”.

      </p>}

    </div>

  )

}

