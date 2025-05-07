import { HourlyWeatherData } from '../../../interface/app.interface';
import HourlyWeatherComponent from '../HourlyWeatherComponent';
import { render, screen } from '../../../test.utils';

describe('display hourly weather data', () => {
  let hourlyForecast: HourlyWeatherData[] = [
    {
      time: '11:00',
      icon: '04d',
      temp: 21,
      description: 'Clouds'
    },
  ];
  test('hourly weather', async() => {
    render(<HourlyWeatherComponent hourlyForecast={hourlyForecast} />);
    const weatherIcon: HTMLImageElement = screen.getByAltText('weather');
    expect(screen.getByRole('time')).toHaveTextContent('11:00');
    expect(weatherIcon.src).toContain(
      'https://openweathermap.org/img/wn/04d@2x.png',
    );
    expect(await screen.findByText('21°C')).toBeInTheDocument();
    expect(await screen.findByText('Clouds')).toBeInTheDocument();
  });
});
