import { createTheme } from "@mui/material/styles"

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    // Define other light theme properties if needed
  },
  // Define other global properties if needed
})

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#27273F", // Example blue color
    },
    secondary: {
      main: "#f48fb1", // Example pink color
    },
    background: {
      default: "#121212", // Darker background
      paper: "#1e1e1e", // Dark paper color
    },
    text: {
      primary: "#fff", // Light text for better contrast on dark background
      secondary: "#b3b3b3", // Slightly dim text for less emphasis
    },
  },
  // Define other global properties if needed
})
