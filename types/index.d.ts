import React from "react"

export interface IUser {
  _id: number
  email: string
  name: string
  username: string
  avatar: string
}

export interface SearchBarProps {
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  fetchUsers: () => void
}

export interface IFormData {
  name: string
  username: string
  email: string
  password: string
}
export interface NavbarProps {
  children: React.ReactNode
}

export interface ProtectedRouteProps {
  children: React.ReactNode
}
