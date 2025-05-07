import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WeatherState } from "../interface/app.interface";
import { getCoordinates, updateWeather } from "../services/api";

interface AppState {
  weatherState: WeatherState[] | Array<any>;
  isLoading: boolean;
  errorMessage: string | null;
}

const initialState: AppState = {
  weatherState: [],
  isLoading: false,
  errorMessage: null,
};

const appSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    removeCity: (state, action: PayloadAction<string>) => {
      state.weatherState = state.weatherState.filter(
        (element) => element.cityName !== action.payload,
      );
      localStorage.setItem("weatherState", JSON.stringify(state.weatherState));
    },
    loadCities: (state, action: PayloadAction<WeatherState[]>) => {
      state.weatherState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCoordinates.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCoordinates.fulfilled, (state, action) => {
      state.isLoading = false;
      state.weatherState.push(action.payload);
    });
    builder.addCase(
      getCoordinates.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      },
    );
    builder.addCase(updateWeather.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateWeather.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedCityIndex = state.weatherState.findIndex(
        (element) => Math.round(element.lat) === Math.round(action.payload.lat),
      );
      if (updatedCityIndex !== -1) {
        state.weatherState[updatedCityIndex].weather = action.payload;
        localStorage.setItem(
          "weatherState",
          JSON.stringify(state.weatherState),
        );
      }
    });
    builder.addCase(
      updateWeather.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      },
    );
  },
});

export const { removeCity, loadCities } = appSlice.actions;
export default appSlice.reducer;
