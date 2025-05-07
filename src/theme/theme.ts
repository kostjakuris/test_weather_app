import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
  globalCss: {
    body: {
      background: "blue.400",
    },
    "*": {
      fontFamily: "Karla, sans-serif",
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
      color: "black",
    },
  },
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'Karla', sans-serif` },
      },
      fontSizes: {
        xs: { value: "13px" },
        sm: { value: "16px" },
        md: { value: "15px" },
        lg: { value: "1.125rem" },
        xl: { value: "20px" },
        "2xl": { value: "24px" },
        "3xl": { value: "27px" },
        "4xl": { value: "36px" },
        "5xl": { value: "40px" },
        "6xl": { value: "54px" },
      },
    },
    breakpoints: {
      sm: "200px",
      md: "700px",
      lg: "900px",
      xl: "1200px",
    },
  },
});
