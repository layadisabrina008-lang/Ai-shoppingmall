// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind className merger
 * Usage: className={cn("p-4", condition && "bg-red-500")}
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* -------------------------------------------------------------------------- */
/*                               Env & safety                                 */
/* -------------------------------------------------------------------------- */

export const isBrowser = typeof window !== "undefined";

/* -------------------------------------------------------------------------- */
/*                           Formatting / display                             */
/* -------------------------------------------------------------------------- */

/**
 * Format a number as currency.
 * Defaults to CHF + de-CH because 🇨🇭 queen.
 */
export function fmtCurrency(
  value: number | string | null | undefined,
  currency: string = "CHF",
  locale: string = "de-CH"
): string {
  if (value == null) return "";
  const num = Number(value);
  if (Number.isNaN(num)) return "";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(num);
}

/**
 * Format a number with separators.
 * e.g. 12345 -> "12,345"
 */
export function fmtNumber(
  value: number | string | null | undefined,
  locale: string = "en-US"
): string {
  if (value == null) return "";
  const num = Number(value);
  if (Number.isNaN(num)) return "";
  return new Intl.NumberFormat(locale).format(num);
}

/**
 * Format a percentage (0–1 or 0–100).
 * e.g. 0.23 -> "23%", 23 -> "23%"
 */
export function fmtPercent(
  value: number | string | null | undefined,
  options: { fromFraction?: boolean; digits?: number } = {}
): string {
  const { fromFraction = true, digits = 0 } = options;
  if (value == null) return "";
  let num = Number(value);
  if (Number.isNaN(num)) return "";
  if (fromFraction) num = num * 100;
  return `${num.toFixed(digits)}%`;
}

/**
 * Short number formatter, e.g. 1200 -> "1.2K"
 */
export function fmtCompactNumber(
  value: number | string | null | undefined,
  locale: string = "en-US"
): string {
  if (value == null) return "";
  const num = Number(value);
  if (Number.isNaN(num)) return "";
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);
}

/**
 * Truncate string with "…"
 */
export function truncate(
  value: string,
  maxLength: number,
  suffix: string = "…"
): string {
  if (!value) return "";
  if (value.length <= maxLength) return value;
  return value.slice(0, maxLength).trimEnd() + suffix;
}

/* -------------------------------------------------------------------------- */
/*                              JSON / storage                                */
/* -------------------------------------------------------------------------- */

/**
 * Safe JSON.parse with fallback.
 */
export function safeJSONParse<T>(
  value: string | null | undefined,
  fallback: T
): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

/**
 * Save to localStorage (browser only, no crash on server).
 */
export function saveToStorage(key: string, data: unknown) {
  if (!isBrowser) return;
  try {
    const serialized = JSON.stringify(data);
    window.localStorage.setItem(key, serialized);
  } catch {
    // ignore
  }
}

/**
 * Read from localStorage (with typed fallback).
 */
export function readFromStorage<T>(key: string, fallback: T): T {
  if (!isBrowser) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return safeJSONParse<T>(raw, fallback);
  } catch {
    return fallback;
  }
}

/* -------------------------------------------------------------------------- */
/*                                  timing                                    */
/* -------------------------------------------------------------------------- */

/**
 * Simple sleep helper: await sleep(500)
 */
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Debounce for input / sliders / analytics.
 */
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): T {
  let timer: ReturnType<typeof setTimeout> | undefined;
  // @ts-expect-error - we know the return type is T-compatible
  return function (...args: Parameters<T>) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
