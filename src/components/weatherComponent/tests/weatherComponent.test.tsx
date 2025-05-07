import WeatherComponent from '../WeatherComponent';
import { render, screen } from '../../../test.utils';
import { WeatherState } from '../../../interface/app.interface';

describe('display weather data', () => {
  let forecast: WeatherState;
  beforeAll(() => {
    forecast = {
      cityName: 'Zaporizhzhia',
      lat: 47.8507859,
      lon: 35.1182867,
      weather: {
        current: {
          temp: 21,
          weather: [
            {
              main: 'Clear',
              icon: '01d',
            },
          ],
        },
      },
    };
  });
  test('current weather', async() => {
    render(<WeatherComponent forecast={forecast} />);
    const city = await screen.findByText(/Zaporizhzhia/i);
    const weather = await screen.findByText(/Clear/i);
    expect(city).toBeInTheDocument();
    expect(weather).toBeInTheDocument();
  });
});
