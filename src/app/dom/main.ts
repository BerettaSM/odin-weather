import type {
  AdditionalInfo,
  LocationInfo,
  Forecast,
  WeatherAPIResponse,
} from '../types';

import { getWeatherType } from '../api/codes';
import { createForecastCards } from './forecast';
import { getCurrentWeatherIcon } from './icons';
import { extractAdditionalInfo, extractLocationInfo } from '../api/helpers';

const SCALE_WRAPPER_CLASS = 'scale-wrapper';

export function renderAdditionalInfo(info: AdditionalInfo) {
  document.getElementById('additional-feels-like-metric')!.textContent =
    `${info.feelslike_c} °C`;
  document.getElementById('additional-feels-like-imperial')!.textContent =
    `${info.feelslike_f} °F`;
  document.getElementById('additional-humidity')!.textContent =
    `${info.humidity}%`;
  document.getElementById('additional-chance-of-rain')!.textContent =
    info.chance_of_rain < 0 ? 'N/A' : `${info.chance_of_rain}%`;
  document.getElementById('additional-wind-speed-metric')!.textContent =
    `${info.wind_kph} km/h`;
  document.getElementById('additional-wind-speed-imperial')!.textContent =
    `${info.wind_mph} mp/h`;
}

export function renderCurrentInfo(info: LocationInfo) {
  document.getElementById('summary-condition')!.textContent =
    info.condition.text;
  document.getElementById('summary-region')!.textContent = info.region;
  document.getElementById('summary-location')!.textContent =
    `${info.name}, ${info.country}`;
  const date = new Date(info.localtime);
  const dateStr = date.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const timeStr = date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  document.getElementById('summary-date')!.textContent = dateStr;
  document.getElementById('summary-time')!.textContent = timeStr;
  document.getElementById('summary-temperature-metric')!.textContent =
    `${info.temp_c} °C`;
  document.getElementById('summary-temperature-imperial')!.textContent =
    `${info.temp_f} °F`;
  const weatherType = getWeatherType(info.condition.code);
  const icon = getCurrentWeatherIcon(weatherType, info.is_day === 1);
  icon.classList.add('xl');
  document.getElementById('summary-icon')!.replaceChildren(icon);
}

export function renderForecasts(forecasts: Forecast[]) {
  const container = document.getElementById('daily-forecasts')!;
  const forecastCards = createForecastCards(forecasts);
  container.replaceChildren(...forecastCards);
}

export function renderWeatherData(apiResponse: WeatherAPIResponse) {
  const additionalInfo = extractAdditionalInfo(apiResponse);
  renderAdditionalInfo(additionalInfo);
  const locationInfo = extractLocationInfo(apiResponse);
  renderCurrentInfo(locationInfo);
  renderForecasts(apiResponse.forecast.forecastday);
}

export function switchTemperature(scale: 'metric' | 'imperial') {
  const divs = document.getElementsByClassName(SCALE_WRAPPER_CLASS);
  const action = scale === 'metric' ? 'remove' : 'add';
  for (const div of divs) div.classList[action]('show-imperial');
}
