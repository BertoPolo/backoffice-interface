import React, { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { loginState } from "@/types"

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = useSelector((state: loginState) => state.loginSlice.token)

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
