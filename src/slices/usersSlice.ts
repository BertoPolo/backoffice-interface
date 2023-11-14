import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: 0,
    email: "",
    first_name: "",
    last_name: "",
    avatar: "",
  },
  reducers: {
    changeId: (state, action) => {
      return {
        ...state,
        id: action.payload,
      }
    },

    changeEmail: (state, action) => {
      return {
        ...state,
        email: action.payload,
      }
    },

    changeFirstName: (state, action) => {
      return {
        ...state,
        first_name: action.payload,
      }
    },

    changeLastName: (state, action) => {
      return {
        ...state,
        last_name: action.payload,
      }
    },

    changeAvatar: (state, action) => {
      return {
        ...state,
        avatar: action.payload,
      }
    },
  },
})

export default userSlice.reducer
export const { changeId, changeEmail, changeFirstName, changeLastName, changeAvatar } = userSlice.actions
