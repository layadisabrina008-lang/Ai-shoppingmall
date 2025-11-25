const API_BASE = "http://127.0.0.1:8000"; // your FastAPI backend

export async function fetchPlazaResults(plaza: string, payload: any) {
  const res = await fetch(`${API_BASE}/${plaza}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Request failed");
  return res.json();
}

