import { ChakraProvider } from "@chakra-ui/react";
import { render, RenderOptions } from "@testing-library/react";
import React from "react";
import { system } from "./theme/theme";
import { Provider } from "react-redux";
import store from "./store/store";
import { MemoryRouter } from "react-router-dom";

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ChakraProvider value={system}>
        <MemoryRouter>{children}</MemoryRouter>
      </ChakraProvider>
    </Provider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
