import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import WeatherComponent from '../components/weatherComponent/WeatherComponent';
import styles from '../components/weatherComponent/weather.module.scss';
import { bodyText, titleOne } from '../asserts/globalStyles';
import Header from '../components/header/Header';
import { useAppSelector } from '../hooks/useAppSelector';
import { FadeLoader } from 'react-spinners';
import { useLoadWeather } from '../hooks/useLoadWeather';

const MainPage = () => {
  const isLoading = useAppSelector((state) => state.isLoading);
  const errorMessage = useAppSelector((state) => state.errorMessage);
  
  const weatherData = useAppSelector(state => state.weatherState);
  useLoadWeather();
  
  if (isLoading) {
    return (
      <>
        <Header />
        <Flex justifyContent={'center'} align={'center'} height={'73vh'}>
          <FadeLoader height={20} color={'white'} loading />
        </Flex>
      </>
    );
  }
  
  if (errorMessage) {
    return (
      <>
        <Header />
        <Flex justifyContent={'center'} align={'center'} height={'73vh'}>
          <Text css={{...titleOne}} color={'red.500'}>{errorMessage}</Text>
        </Flex>
      </>
    );
  }
  
  return (
    <>
      <Header />
      {
        weatherData.length === 0 ?
          <Flex justifyContent={'center'} align={'center'} height={'73vh'}>
            <Text css={{...bodyText}}>Please, enter your favorite city name in the form above</Text>
          </Flex>
          :
          <Flex className={styles.weather__wrapper} align={'center'} flexWrap='wrap' aria-label={'City weather cards'}>
            {
              weatherData?.map((element) =>
                <WeatherComponent key={element.cityName} forecast={element} />
              )
            }
          </Flex>
      }
    </>
  );
};

export default MainPage;