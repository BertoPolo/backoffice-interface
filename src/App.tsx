import React, { useState, useEffect, Suspense, lazy } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider, Box } from "@mui/material"

import Login from "./components/Login"
import Navbar from "./components/Navbar"
import ThemeSwitch from "./components/ThemeSwitch"
import ProtectedRoute from "./components/ProtectedRoute"
import { darkTheme, lightTheme } from "./themes/themes"
const Home = lazy(() => import("./components/Home"))
const Register = lazy(() => import("./components/Register"))
const UserDetails = lazy(() => import("./components/UserDetails"))

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
            <Route
              path="/register"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Register />
                </Suspense>
              }
            />
            <Route
              path="/users"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                </Suspense>
              }
            />
            <Route
              path="/users/:id"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <ProtectedRoute>
                    <UserDetails />
                  </ProtectedRoute>
                </Suspense>
              }
            />
          </Routes>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
