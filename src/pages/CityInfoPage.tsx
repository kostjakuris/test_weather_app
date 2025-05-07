import React from 'react';
import HourlyWeatherComponent from '../components/hourlyWeatherComponent/HourlyWeatherComponent';
import { WeatherState } from '../interface/app.interface';
import moment from 'moment/moment';

const CityInfoPage = () => {
  const weatherData = localStorage.getItem('weatherState');
  
  const getHourlyForecast = () => {
    const hoursWeatherData: any[] = [];
    
    if (weatherData) {
      const parsedWeather: WeatherState[] = JSON.parse(weatherData);
      const currentTime = moment(new Date());
      const hourlyWeather = parsedWeather.find((element) =>
        window.location.href.includes(element.cityName.trim().toLowerCase()));
      
      hourlyWeather?.weather.hourly.forEach((element: any) => {
        const convertedUnixTime = moment(element.dt * 1000);
        const timeDifference = convertedUnixTime.diff(currentTime, 'hours');
        if (timeDifference <= 12) {
          hoursWeatherData.push({
              time: new Date(element.dt * 1000).toLocaleTimeString([], {timeStyle: 'short'}),
              icon: element.weather[0].icon,
              temp: Math.round(element.temp),
              description: element.weather[0].main
            }
          );
        }
      });
      
    }
    return hoursWeatherData;
  };
  const hourlyForecast = getHourlyForecast();
  
  return (
    <HourlyWeatherComponent hourlyForecast={hourlyForecast} />
  );
};

export default CityInfoPage;