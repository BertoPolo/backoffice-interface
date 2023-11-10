export interface IUser {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}
export interface loginState {
  loginSlice: {
    token: string
    isLogged: boolean
  }
}
