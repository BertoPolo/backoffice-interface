import { createTheme } from "@mui/material/styles"

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#5f5fb1",
    },
    secondary: {
      main: "#8ff4aa",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#fff",
      secondary: "#b3b3b3",
    },
  },
})

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#27273F",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#fff",
      secondary: "#b3b3b3",
    },
  },
})
