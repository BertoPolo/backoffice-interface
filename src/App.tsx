import React, { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider, Box } from "@mui/material"

import Login from "./components/Login"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import Register from "./components/Register"
// import UserDetails from "./components/UserDetails"
import ThemeSwitch from "./components/ThemeSwitch"
import ProtectedRoute from "./components/ProtectedRoute"
import { darkTheme, lightTheme } from "./themes/themes"

const App: React.FC = () => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">(localStorage.getItem("themeMode") === "dark" ? "dark" : "light")

  const currentTheme = themeMode === "light" ? lightTheme : darkTheme

  const handleThemeChange = () => {
    setThemeMode(themeMode === "light" ? "dark" : "light")
  }

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode)
  }, [themeMode])

  return (
    <BrowserRouter>
      <ThemeProvider theme={currentTheme}>
        <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
          <Navbar>
            <ThemeSwitch toggleTheme={handleThemeChange} />
          </Navbar>

          <Routes>
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="/users/:id"
              element={
                <ProtectedRoute>
                  <UserDetails />
                </ProtectedRoute>
              }
            /> */}
          </Routes>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
