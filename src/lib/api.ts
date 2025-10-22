const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function fetchAPI<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store', 
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'API request failed');
  }
  return data as T;
}
