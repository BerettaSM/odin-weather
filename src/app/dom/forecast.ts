import type { Forecast } from '../types';

import { getWeatherType } from '../api/codes';
import { getCurrentWeatherIcon } from './icons';
import { parseISODateLocal } from '../utils';

const template = document.getElementById(
  'forecast-template',
) as HTMLTemplateElement;
template.remove();

export function createForecastCard(forecast: Forecast) {
  const card = template.content.cloneNode(true) as HTMLDivElement;
  const date = parseISODateLocal(forecast.date);
  const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
  card.querySelector('.forecast-day')!.textContent = weekday;
  card.querySelector('.high .metric')!.textContent =
    `${forecast.day.maxtemp_c} °C`;
  card.querySelector('.high .imperial')!.textContent =
    `${forecast.day.maxtemp_f} °F`;
  card.querySelector('.low .metric')!.textContent =
    `${forecast.day.mintemp_c} °C`;
  card.querySelector('.low .imperial')!.textContent =
    `${forecast.day.mintemp_f} °F`;
  const weatherType = getWeatherType(forecast.day.condition.code);
  const svg = getCurrentWeatherIcon(weatherType, true);
  svg.classList.add('lg');
  card.querySelector('.forecast-icon')!.replaceChildren(svg);
  return card;
}

export function createForecastCards(forecasts: Forecast[]) {
  return forecasts.map(createForecastCard);
}
