import React, { FC, useCallback } from 'react';
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { bodyText, deleteButton, updateButton } from '../../asserts/globalStyles';
import styles from './weather.module.scss';
import { Link } from 'react-router-dom';
import { WeatherState } from '../../interface/app.interface';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { updateWeather } from '../../services/api';
import { removeCity } from '../../store/slice';

interface WeatherCardProps {
  forecast: WeatherState;
}

const WeatherComponent: FC<WeatherCardProps> = ({forecast}) => {
  const dispatch = useAppDispatch();
  
  const {
    cityName = '',
    lat = 0,
    lon = 0,
    weather: {
      current: {
        temp,
        weather: [firstWeather],
      },
    },
  } = forecast;
  const {main, icon} = firstWeather;
  
  const handleUpdate = useCallback(() => {
    dispatch(updateWeather({lat: Number(lat), lon: Number(lon)}));
  }, [dispatch, lat, lon]);
  
  const handleRemove = useCallback(() => {
    dispatch(removeCity(cityName));
  }, [dispatch, cityName]);
  
  const iconSrc =
    main === 'Clear'
      ? '/images/sunny.svg'
      : `https://openweathermap.org/img/wn/${icon}@2x.png`;
  
  
  return (
    <Box className={styles.weather__card} role='region' aria-label={`Weather card for ${cityName}`}>
      {
        <>
          <Link to={`/weather-into/${cityName.trim().toLowerCase()}`} aria-label={`View ${cityName} details`}>
            <Flex justify='center' align='center' direction='column'>
              <Text css={bodyText}>{cityName}</Text>
              <Image src={iconSrc} alt={`${main} icon`} />
              <Text css={bodyText}>{Math.round(temp)}°C</Text>
              <Text css={bodyText}>{main}</Text>
            </Flex>
          </Link>
          <Flex pt='40px' width='100%' justify='flex-end' align='center'>
            <Button
              css={deleteButton}
              onClick={handleRemove}
              aria-label={`Remove ${cityName}`}
            />
            <Button
              css={updateButton}
              onClick={handleUpdate}
              aria-label={`Refresh ${cityName}`}
            />
          </Flex>
        </>
      }
    </Box>
  
  );
  
};

export default WeatherComponent;