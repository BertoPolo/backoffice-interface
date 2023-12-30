import React from "react"
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { ProtectedRouteProps } from "@/types"

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token: any = sessionStorage.getItem("token")

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
