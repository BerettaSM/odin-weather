import { HttpError } from './HttpError';

export async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url, { mode: 'cors' });
  const data = await response.json();
  if (!response.ok) {
    const message = data?.error?.message || response.statusText;
    throw new HttpError(message, response.status);
  }
  return data;
}

export * from './HttpError';
