"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { PlazaHeader } from "@/components/PlazaHeader";
import { UploadSelfie } from "@/components/UploadSelfie";
import { FeatureForm } from "@/components/FeatureForm";
import { OutfitGrid } from "@/components/OutfitGrid";

import { API, json } from "@/lib/api";
import { fallbackMatch } from "@/lib/fallbackMatcher";

import type { StyleInput, OutfitResponse, Undertone } from "@/types/style";

/* -------------------------------------------------------------------------- */
/*                                Aura Visualizer                              */
/* -------------------------------------------------------------------------- */

function AuraVisualizer({ undertone }: { undertone?: Undertone }) {
  if (!undertone) return null;

  const colors: Record<Undertone, string> = {
    cool: "from-indigo-300 via-blue-400 to-violet-400",
    warm: "from-amber-300 via-orange-400 to-rose-400",
    neutral: "from-stone-300 via-zinc-300 to-slate-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`h-28 rounded-2xl bg-gradient-to-r ${colors[undertone]} shadow-inner`}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Vibe Summary                                */
/* -------------------------------------------------------------------------- */

function VibeSummary({ explanation }: { explanation?: string }) {
  if (!explanation) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-2xl border bg-gradient-to-br from-white/60 via-neutral-50 to-white/40 dark:from-neutral-900/50 dark:via-neutral-900/40 backdrop-blur-md shadow-sm"
    >
      <p className="font-medium text-lg mb-1">✨ Style Insight</p>
      <p className="text-neutral-600 dark:text-neutral-300 text-sm">
        {explanation}
      </p>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Cloth Plaza                                 */
/* -------------------------------------------------------------------------- */

export default function ClothPage() {
  const [selfieUrl, setSelfieUrl] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<OutfitResponse | null>(null);
  const [undertone, setUndertone] = useState<Undertone | undefined>();

  /* ---------------------------- Undertone normalizer ---------------------------- */

  const normalizeUndertone = (
    raw: string | undefined
  ): Undertone | undefined => {
    if (raw === "cool" || raw === "neutral" || raw === "warm") return raw;
    return undefined;
  };

  /* -------------------------------------------------------------------------- */
  /*                                   RUN FLOW                                 */
  /* -------------------------------------------------------------------------- */

  const run = async (partial: StyleInput) => {
    setLoading(true);
    setError(null);
    setData(null);

    let payload: StyleInput = {
      ...partial,
      selfieUrl,
    };

    try {
      /* ---------------------- 1) AI Undertone Detection ----------------------- */
      if (selfieUrl && !payload.undertone) {
        const uRes = await fetch(API("/vision/undertone"), {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ image_url: selfieUrl }),
        });

        const uJson = await json<any>(uRes);

        payload = {
          ...payload,
          undertone: normalizeUndertone(uJson.undertone) ?? payload.undertone,
          faceShape: uJson.face_shape ?? payload.faceShape,
          bodyShape: uJson.body_shape ?? payload.bodyShape,
          skinTone: uJson.skin_tone ?? payload.skinTone,
          eyeColor: uJson.eye_color ?? payload.eyeColor,
          hairColor: uJson.hair_color ?? payload.hairColor,
        };

        setUndertone(payload.undertone);
      }

      /* ----------------------- 2) AI Outfit Generation ------------------------ */

      const res = await fetch(API("/style/outfit"), {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      const out = await json<OutfitResponse>(res);

      setData(out);
      setUndertone(payload.undertone);
    } catch (err: any) {
      /* -------------------------- Fallback Offline --------------------------- */

      console.warn("Falling back to offline matcher:", err?.message);

      const out = fallbackMatch(payload);
      setData(out);

      setError(
        "Using offline matcher while AI service is unavailable. Results may be less accurate."
      );

      setUndertone(payload.undertone);
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                    UI                                      */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="space-y-8">
      <PlazaHeader
        title="Cloth Plaza"
        subtitle="AI detects your undertone & creates your personalized outfit."
        image="https://images.unsplash.com/photo-1520975922533-6c03c1c87ebb?q=80&w=1600"
      />

      <div className="grid md:grid-cols-3 gap-6">
        {/* --------------------------- Left Column ---------------------------- */}
        <div className="space-y-4">
          <UploadSelfie onChange={setSelfieUrl} />
          {undertone && <AuraVisualizer undertone={undertone} />}

          <div className="text-xs text-neutral-500 dark:text-neutral-400">
            Your photos are never stored. Used only for real-time color
            analysis.
          </div>
        </div>

        {/* -------------------------- Right Column --------------------------- */}
        <div className="md:col-span-2 space-y-6">
          <FeatureForm onSubmit={run} />

          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-xl h-24 flex items-center justify-center border bg-neutral-100 dark:bg-neutral-800 animate-pulse"
              >
                <span className="text-neutral-500">
                  ✨ Generating your outfit...
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <div className="border rounded-xl p-3 text-amber-600 bg-amber-50 dark:bg-amber-950/30">
              {error}
            </div>
          )}

          {data && (
            <>
              <VibeSummary explanation={data.explanation} />
              <OutfitGrid items={data.items} />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border p-4 text-sm text-neutral-500 dark:text-neutral-300 text-center bg-white/60 dark:bg-neutral-900/60"
              >
                🪞 MirrorVerse virtual try-on coming soon — see outfits directly
                on your avatar.
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

