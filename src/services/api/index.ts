import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UpdateWeatherData } from "../../interface/app.interface";

const apiUrl = process.env.REACT_APP_API_URL;
const geocodingApiUrl = process.env.REACT_APP_GEOCODING_URL;
const apiKey = process.env.REACT_APP_API_KEY;

export const getCoordinates = createAsyncThunk(
  "getCityCoordinates",
  async (cityName: string, thunkAPI) => {
    try {
      const coordinates = await axios.get(
        `${geocodingApiUrl}/direct?q=${cityName}&limit=1&appid=${apiKey}`,
        {},
      );
      if (coordinates.data.length === 0) {
        return thunkAPI.rejectWithValue("City not found");
      }
      const { lat, lon, name } = coordinates.data[0];
      const weatherResponse = await axios.get(
        `${apiUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`,
        {},
      );
      const newCityWeather = {
        cityName: name,
        lat,
        lon,
        weather: weatherResponse.data,
      };
      const existing = JSON.parse(localStorage.getItem("weatherState") || "[]");
      const updated = [...existing, newCityWeather];
      localStorage.setItem("weatherState", JSON.stringify(updated));
      console.log(newCityWeather);
      return newCityWeather;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateWeather = createAsyncThunk(
  "updateWeatherData",
  async ({ lat, lon }: UpdateWeatherData, thunkAPI) => {
    try {
      const response = await axios.get(
        `${apiUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`,
        {},
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
