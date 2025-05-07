import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "./theme/theme";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import MainPage from "./pages/MainPage";
import CityInfoPage from "./pages/CityInfoPage";
import store from "./store/store";
import { Provider } from "react-redux";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, Component: MainPage },
      { path: "weather-into/:cityname", Component: CityInfoPage },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <ChakraProvider value={system}>
          <RouterProvider router={router} />
        </ChakraProvider>
      </Provider>
    </React.StrictMode>,
  );
}
