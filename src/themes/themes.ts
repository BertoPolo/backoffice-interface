import { createTheme } from "@mui/material/styles"

//  mytheme: {

//  "primary": "#1d6c91",

//  "secondary": "#a0ffe8",

//  "accent": "#73e855",

//  "neutral": "#141824",

//  "base-100": "#ededee",

//  "info": "#81b8df",

//  "success": "#1ca08a",

//  "warning": "#ca6e0c",

//  "error": "#f41027",
//           },

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1d6c91",
    },
    secondary: {
      main: "#a0ffe8",
    },
    success: {
      main: "#1ca08a",
    },
    info: {
      main: "#81b8df",
    },
    warning: {
      main: "#ca6e0c",
    },
    error: {
      main: "#f41027",
    },
    background: {
      default: "#ededee",
      paper: "#ffffff",
    },
    text: {
      primary: "#141824",
      secondary: "rgba(0, 0, 0, 0.54)",
    },
  },
  typography: {
    fontFamily: "'Space Mono', monospace",
  },
})

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#b3ea85",
    },
    secondary: {
      main: "#74abcc",
    },
    success: {
      main: "#1db478",
    },
    info: {
      main: "#4f82c9",
    },
    warning: {
      main: "#ceaa09",
    },
    error: {
      main: "#dd223e",
    },
    background: {
      default: "#21384a",
      paper: "#202b32",
    },
    text: {
      primary: "#ffffff",
      secondary: "202b32",
    },
  },
  typography: {
    fontFamily: "'Space Mono', monospace",
  },
})
