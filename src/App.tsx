import React, { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider, createTheme, Switch } from "@mui/material"
import Login from "./components/Login"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"
import { darkTheme, lightTheme } from "../themes/themes"

const App: React.FC = () => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">(localStorage.getItem("themeMode") === "dark" ? "dark" : "light")

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode)
  }, [themeMode])

  const currentTheme = createTheme({
    palette: {
      mode: themeMode,
    },
  })

  // const lightTheme = createTheme({
  //   palette: {
  //     mode: "light",
  //     // Define other light theme properties if needed
  //   },
  //   // Define other global properties if needed
  // })

  // const darkTheme = createTheme({
  //   palette: {
  //     mode: "dark",
  //     primary: {
  //       main: "#27273F", // Example blue color
  //     },
  //     secondary: {
  //       main: "#f48fb1", // Example pink color
  //     },
  //     background: {
  //       default: "#121212", // Darker background
  //       paper: "#1e1e1e", // Dark paper color
  //     },
  //     text: {
  //       primary: "#fff", // Light text for better contrast on dark background
  //       secondary: "#b3b3b3", // Slightly dim text for less emphasis
  //     },
  //   },
  //   // Define other global properties if needed
  // })
  const handleThemeChange = () => {
    setThemeMode(themeMode === "light" ? "dark" : "light")
  }

  return (
    <BrowserRouter>
      <ThemeProvider theme={currentTheme}>
        <Navbar />
        <Switch checked={themeMode === "dark"} onChange={handleThemeChange} />

        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
