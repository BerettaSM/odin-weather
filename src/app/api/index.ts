import type { SearchParams, WeatherAPIResponse } from '../types';

import { fetchData } from '../http';
import { delay, parseSearchParameters } from '../utils';

const API_KEY = '2b16a002010d4dbb84113453242606';
const BASE_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&aqi=no&alerts=no`;

export async function getWeatherData(query: string, params?: SearchParams) {
  const parsedParameters = params ? `&${parseSearchParameters(params)}` : '';
  const [response] = await Promise.all([
    fetchData<WeatherAPIResponse>(`${BASE_URL}&q=${query}${parsedParameters}`),
    delay(1000),
  ]);
  return response;
}
