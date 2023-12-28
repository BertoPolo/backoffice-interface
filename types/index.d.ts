export interface IUser {
  id: number
  email: string
  name: string
  lastname: string
  avatar: string
}
export interface loginState {
  loginSlice: {
    token: string
    isLogged: boolean
  }
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
