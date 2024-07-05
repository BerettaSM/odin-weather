import type {
  AdditionalInfo,
  LocationInfo,
  WeatherAPIResponse,
} from '../types';

export function extractAdditionalInfo(
  response: WeatherAPIResponse,
): AdditionalInfo {
  const { humidity, feelslike_c, feelslike_f, wind_kph, wind_mph } =
    response.current;
  const [firstForecast] = response.forecast.forecastday;

  return {
    humidity,
    feelslike_c,
    feelslike_f,
    wind_kph,
    wind_mph,
    chance_of_rain: firstForecast?.day.daily_chance_of_rain ?? -1,
  } satisfies AdditionalInfo;
}

export function extractLocationInfo(
  response: WeatherAPIResponse,
): LocationInfo {
  const { country, localtime, name, region } = response.location;
  const { temp_c, temp_f, condition, is_day } = response.current;

  return {
    country,
    localtime,
    name,
    region,
    temp_c,
    temp_f,
    condition,
    is_day,
  } satisfies LocationInfo;
}
