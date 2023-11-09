import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/Login" // Make sure the path is correct to your LoginPage component

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
