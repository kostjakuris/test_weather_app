import { getCoordinates, updateWeather } from "../index";
import axios from "axios";
import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../../../store/slice";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Test API", () => {
  let cityResponse: any;
  let weatherResponse: any;
  let weatherData: any;
  let weatherError: any;
  const store = configureStore({ reducer: { auth: appReducer } });

  beforeAll(() => {
    cityResponse = {
      data: [
        {
          name: "Zaporizhzhia",
          lat: 47.8507859,
          lon: 35.1182867,
        },
      ],
    };
    weatherResponse = {
      data: {
        lat: 47.8507859,
        lon: 35.1182867,
        timezone: "Ukraine/Kviv",
        timezone_offset: -18000,
        current: {
          temp: 292.55,
          feels_like: 292.87,
          weather: [],
        },
      },
    };
    weatherData = {
      cityName: "Zaporizhzhia",
      lat: 47.8507859,
      lon: 35.1182867,
      weather: weatherResponse.data,
    };
    weatherError = {
      data: [
        {
          cod: "400",
          message: "wrong latitude",
        },
      ],
    };
  });
  test("Search of city coordinates", async () => {
    mockedAxios.get.mockResolvedValueOnce(cityResponse);
    mockedAxios.get.mockResolvedValueOnce(weatherResponse);
    const weather = await store.dispatch(getCoordinates("Zaporizhzhia"));
    expect(weatherData).toEqual(weather.payload);
  });
  test("Wrong city name", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });
    const errorResponse = await store.dispatch(getCoordinates("fgsdf"));
    expect(errorResponse.payload).toBe("City not found");
  });
  test("Get weather data", async () => {
    mockedAxios.get.mockResolvedValue(weatherResponse);
    const weatherState = await store.dispatch(
      updateWeather({ lat: 47.8507859, lon: 35.1182867 }),
    );
    expect(weatherResponse.data).toEqual(weatherState.payload);
  });
  test("Wrong latitude", async () => {
    mockedAxios.get.mockResolvedValue(weatherError);
    const weatherData = await store.dispatch(
      updateWeather({ lat: 47.85e7859, lon: 35.1182867 }),
    );
    expect(weatherData.payload).toEqual(weatherError.data);
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
});
