import { createSlice } from "@reduxjs/toolkit"

const loginSlice = createSlice({
  name: "users",
  initialState: {
    token: "",
  },
  reducers: {
    addToken: (state, action) => {
      return {
        ...state,
        token: action.payload,
      }
    },

    removeToken: (state, action) => {
      return {
        ...state,
        token: action.payload,
      }
    },
  },
})

export default loginSlice.reducer
export const { addToken, removeToken } = loginSlice.actions
