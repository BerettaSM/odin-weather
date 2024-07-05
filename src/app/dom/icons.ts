import { WeatherType } from '../api/codes';

const template = document.getElementById(
  'icon-templates',
) as HTMLTemplateElement;
template.remove();

const elements = [...template.content.children] as SVGElement[];

const icons = elements.reduce(
  (dict, cur) => {
    const name = cur.dataset.icon!;
    dict[name] = cur;
    return dict;
  },
  {} as Record<string, SVGElement>,
);

export function getCurrentWeatherIcon(type: WeatherType, isDay: boolean) {
  const key =
    type === WeatherType.RAIN
      ? 'rain'
      : type === WeatherType.CLOUDY
        ? 'cloud'
        : isDay
          ? 'sun'
          : 'moon';
  return icons[key].cloneNode(true) as SVGElement;
}

export default icons;
