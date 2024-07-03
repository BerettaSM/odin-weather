export interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

export interface CurrentWeather {
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: 0 | 1;
  condition: {
    text: string;
    code: number;
  };
  wind_mph: number;
  wind_kph: number;
  humidity: number;
  feelslike_c: number;
  feelslike_f: number;
}

export interface Forecast {
  date: string;
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    daily_chance_of_rain: 0 | 1;
    condition: {
      text: string;
      code: number;
    };
  };
}

export interface Forecasts {
  forecastday: Forecast[];
}

export interface WeatherAPIResponse {
  location: Location;
  current: CurrentWeather;
  forecast: Forecasts;
}
