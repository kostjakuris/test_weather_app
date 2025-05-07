import React, { FC } from 'react';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { Flex, Image, Text } from '@chakra-ui/react';
import { bodyText, titleOne } from '../../asserts/globalStyles';
import { HourlyWeatherProps } from '../../interface/app.interface';

const HourlyWeatherComponent: FC<HourlyWeatherProps> = ({hourlyForecast}) => {
  
  return (
    <Flex direction={'column'} align={'center'} justifyContent={'center'} role={'forecast'}>
      <Text textAlign={'center'} css={{...titleOne}} mt={'60px'}>Hourly forecast</Text>
      <Flex mt={'40px'} align={'center'} flexWrap={'wrap'} aria-label={'Hourly forecast cards'}>
        {
          hourlyForecast.map((element, index) =>
            <Flex key={element.time} direction={'column'} align={'center'} height={'200px'} justifyContent={'center'}
              m={'0 20px 60px 20px'} aria-label={'View hourly forecast'}>
              <Text
                key={index}
                css={{...bodyText}}
                role={'time'}
              >
                {element.time}
              </Text>
              <Image
                src={`https://openweathermap.org/img/wn/${element.icon}@2x.png`}
                alt={'weather'}
              />
              <Text css={{...bodyText}}>{Math.round(element.temp)}°C</Text>
              <Text css={{...bodyText}}>{element.description}</Text>
            </Flex>
          )
        }
      </Flex>
      <Flex direction={'column'} align={'center'} justifyContent={'center'} width={'95%'} mb={'40px'}>
        <Text textAlign={'center'} css={{...titleOne}} m={'40px 0'}>Hourly temperature chart</Text>
        <LineChart
          width={window.innerWidth <= 650 ? 400 : 600}
          height={window.innerWidth <= 650 ? 350 : 450}
          data={hourlyForecast}
          style={{marginRight: '50px'}}
        >
          <CartesianGrid strokeDasharray='1 1' strokeWidth={'2px'} />
          <XAxis dataKey='time' strokeWidth={'1px'} style={{fontSize: '17px', color: 'black', fontWeight: 600}} />
          <YAxis strokeWidth={'1px'} style={{fontSize: '17px', color: 'black', fontWeight: 600}} />
          <Tooltip />
          <Line type='monotone' dataKey='temp' stroke='#82ca9d' strokeWidth={'1.5px'} />
          <Line type='monotone' dataKey='description' strokeWidth={'2px'} activeDot={{r: 9}} />
        </LineChart>
      </Flex>
    </Flex>
  );
};

export default HourlyWeatherComponent;