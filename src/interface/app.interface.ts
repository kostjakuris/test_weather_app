export interface WeatherData {
  current?: any;
  daily?: Array<any>;
  hourly?: any;
}

export interface WeatherCoordinates {
  lat: number;
  lon: number;
  cityName: string;
}

export interface UpdateWeatherData {
  lat: number;
  lon: number;
}

export interface WeatherState {
  cityName: string;
  lat: number;
  lon: number;
  weather: WeatherData;
}

export interface HourlyWeatherData {
  time: number;
  icon: string;
  temp: number;
  description: string;
}

export interface HourlyWeatherProps {
  hourlyForecast: HourlyWeatherData[];
}
