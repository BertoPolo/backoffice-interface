import React from "react"
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { ProtectedRouteProps } from "@/types"

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token: string | null = sessionStorage.getItem("token")

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
