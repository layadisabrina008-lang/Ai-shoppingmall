// src/lib/api.ts

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

export const API = (path: string) => {
  if (!path.startsWith('/')) path = `/${path}`
  return `${BASE_URL}${path}`
}

export async function json<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(
      `Request failed ${res.status} ${res.statusText}${
        text ? ` - ${text}` : ''
      }`,
    )
  }
  return (await res.json()) as T
}

