import React, { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider, createTheme, Switch } from "@mui/material"
import Login from "./components/Login"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"
// import { darkTheme, lightTheme } from "../themes/themes"

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
