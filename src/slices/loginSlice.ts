import { createSlice } from "@reduxjs/toolkit"

const loginSlice = createSlice({
  name: "login",
  initialState: {
    token: "",
    // isLogged: false,
  },
  reducers: {
    addToken: (state, action) => {
      return {
        ...state,
        token: action.payload,
        // isLogged: true,
      }
    },

    removeToken: (state, action) => {
      return {
        ...state,
        token: action.payload,
        // isLogged: false,
      }
    },

    // logIn: (state, action) => {
    //   return {
    //     ...state,
    //     isLogged: action.payload,
    //   }
    // },

    // logOut: (state, action) => {
    //   return {
    //     ...state,
    //     isLogged: action.payload,
    //   }
    // },
  },
})

export default loginSlice.reducer
export const { addToken, removeToken } = loginSlice.actions
