import { useCallback, useEffect } from 'react';
import { loadCities } from '../store/slice';
import { updateWeather } from '../services/api';
import { useAppDispatch } from './useAppDispatch';

export const useLoadWeather = () => {
  const dispatch = useAppDispatch();
  
  const getWeatherData = useCallback(() => {
    const savedWeather = localStorage.getItem('weatherState');
    if (savedWeather) {
      const parsedWeather = JSON.parse(savedWeather);
      dispatch(loadCities(parsedWeather));
      parsedWeather.forEach((weather: {lat: number; lon: number; cityName: string}) => {
        dispatch(updateWeather({lat: weather.lat, lon: weather.lon}));
      });
    }
  }, []);
  
  useEffect(() => {
    getWeatherData();
  }, [getWeatherData]);
};

