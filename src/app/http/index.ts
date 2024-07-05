import type { WeatherAPIResponse } from '../types';
import { HttpError } from './HttpError';

const API_KEY = '2b16a002010d4dbb84113453242606';
const BASE_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&days=5&aqi=no&alerts=no`;

async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url, { mode: 'cors' });
  const data = await response.json();
  if (!response.ok) {
    const message = data?.error?.message || response.statusText;
    throw new HttpError(message, response.status);
  }
  return data;
}

export async function getWeatherData(query: string) {
  return await fetchData<WeatherAPIResponse>(`${BASE_URL}&q=${query}`);
}
