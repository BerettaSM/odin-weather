export enum WeatherType {
  CLEAR,
  CLOUDY,
  RAIN,
}

function isCloudy(code: number) {
  return (code >= 1003 && code <= 1030) || (code >= 1135 && code <= 1147);
}

export function getWeatherType(code: number): WeatherType {
  if (code === 1000) return WeatherType.CLEAR;
  if (isCloudy(code)) return WeatherType.CLOUDY;
  return WeatherType.RAIN;
}
