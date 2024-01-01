import React from "react"

export interface IUser {
  _id: number
  email: string
  name: string
  lastname: string
  avatar: string
}
// export interface loginState {
//   loginSlice: {
//     token: string
//     // isLogged: boolean
//   }
// }
export interface SearchBarProps {
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  fetchUsers: () => void
}

export interface IFormData {
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
